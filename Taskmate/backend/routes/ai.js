const Groq = require('groq-sdk');
const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

// Warn if key missing
if (!process.env.GROQ_API_KEY) {
  console.warn('⚠️ GROQ_API_KEY is not set. AI routes will not work until configured.');
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ Updated function for text generation using the Groq SDK
async function generateTextFromPrompt(prompt) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Server missing GROQ_API_KEY.');
  }

  const modelName = 'llama-3.3-70b-versatile'; // Recommended replacement model

  try {
    console.log(`Attempting to generate text with model: ${modelName}`);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: modelName,
    });

    const text = chatCompletion.choices[0]?.message?.content || '';

    if (text) {
      console.log(`✅ Successfully generated text with model: ${modelName}`);
      return text;
    }

    throw new Error('Empty response from model.');
  } catch (err) {
    console.error(`❌ Model ${modelName} failed with error: ${err.message}`);
    throw new Error(`AI generation failed: ${err.message}`);
  }
}

// ======================= ROUTES =======================

// Summarize all tasks in a project
router.get('/summarize/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!process.env.GEMINI_API_KEY)
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY.' });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const tasks = await Task.find({ projectId });
    const prompt =
      `Summarize the following tasks for project '${project.name}':\n` +
      tasks.map(t => `- ${t.title}: ${t.description}`).join('\n');

    const summary = await generateTextFromPrompt(prompt);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: `AI summarization failed: ${err.message}` });
  }
});

// Task Q&A
router.post('/qa/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { question } = req.body || {};
    if (!question?.trim()) return res.status(400).json({ error: 'Question required.' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const prompt = `Task: ${task.title}\nDescription: ${task.description}\nQuestion: ${question}`;
    const answer = await generateTextFromPrompt(prompt);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: `AI Q&A failed: ${err.message}` });
  }
});

// Project Q&A
router.post('/project-qa/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { question } = req.body || {};
    if (!question?.trim()) return res.status(400).json({ error: 'Question required.' });

    const project = await Project.findById(projectId);
    const tasks = await Task.find({ projectId });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const taskContext = tasks.length
      ? tasks.map(t => `- ${t.title} (Status: ${t.status})`).join('\n')
      : 'This project has no tasks yet.';

    const prompt = `
The user is asking about the project "${project.name}".

Project Description: ${project.description}

Tasks:
${taskContext}

User Question: "${question}"

Answer based on the above information.`;

    const answer = await generateTextFromPrompt(prompt);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: `Failed to get AI response: ${err.message}` });
  }
});

module.exports = router;