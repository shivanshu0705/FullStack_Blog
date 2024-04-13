require('dotenv').config();
const util = require('../models/util.js');
const express = require('express');
const config = require('../server/config/config');

const aiController = express.Router();

const API_KEY = process.env.AI_API_KEY;

aiController.get('/ai', util.logRequest, (req, res) => {
    res.sendFile('ai.html', {root: config.ROOT})
})

const getAiSuggestion = async (prompt) => {
    const systemMessage = {
        role: 'system',
        content: prompt,
    };

    const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage],
    };

    try {
        const fetch = await import('node-fetch'); // Use dynamic import
        const response = await fetch.default('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        });

        const data = await response.json();
        console.log(data);
        return data.choices[0].message.content;
    } catch (error) {
        // Handle error
        console.error('Error:', error);
    }
};

aiController.get('/api/ai', async (req, res) => {
    try {
        const promptExample = 'Write a Python function to reverse a string.';
        const suggestion = await getAiSuggestion(promptExample);
        if (suggestion) {
            console.log(`AI Suggestion: ${suggestion}`);
            res.status(200).json({ suggestion });
        } else {
            console.log('Error fetching AI suggestion.');
            res.status(500).json({ error: 'Error fetching AI suggestion' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

aiController.post('/api/ai', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const content = await getAiSuggestion(prompt);
        if (content) {
            console.log(`AI Suggestion: ${content}`);
            res.status(200).json({ content });
        } else {
            console.log('Error fetching AI suggestion.');
            res.status(500).json({ error: 'Error fetching AI suggestion' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = aiController;
