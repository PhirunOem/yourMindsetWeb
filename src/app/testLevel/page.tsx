'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/button/Button';

const questions = [
    "I find it hard to relax.",
    "I feel nervous or anxious without any clear reason.",
    "I get easily irritated or frustrated.",
    "I have trouble sleeping due to racing thoughts.",
    "I feel overwhelmed by small tasks.",
    "I experience headaches or muscle tension.",
    "I struggle to focus or concentrate.",
    "I feel a lack of motivation or energy.",
    "I worry excessively about the future.",
    "I feel like I don’t have control over my life."
];

const options = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 },
    { label: "Always", value: 4 }
];

export default function StressTest() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOptionChange = (qIndex: number, value: number) => {
        const updated = [...answers];
        updated[qIndex] = value;
        setAnswers(updated);
    };

    const getStressLevel = (score: number) => {
        if (score <= 15) return "Low Stress 🟢";
        if (score <= 30) return "Moderate Stress 🟡";
        return "High Stress 🔴";
    };

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const stressLevel = getStressLevel(totalScore);

    const handleSubmit = async () => {
        if (answers.includes(null)) return alert("Please answer all questions.");
        setLoading(true);
        try {
            const res = await fetch('/api/save-stress-result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answers,
                    totalScore,
                    stressLevel,
                    date: new Date().toISOString(),
                }),
            });

            const data = await res.json();
            console.log("API Response:", data);
        } catch (error) {
            console.error("Failed to save result:", error);
        } finally {
            setSubmitted(true);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold mb-4">Stress Level Self-Test</h1>
                <div><Link href="/">Cancel</Link></div>
            </div>

            {!submitted ? (
                <form>
                    {questions.map((q, index) => (
                        <div key={index}>
                            <div className='p-2 pl-2 border border-gray-300 mb-1 rounded-md'>
                                <p className="font-semibold mb-2">{index + 1}. {q}</p>
                                <div className="flex flex-col gap-2 pl-4">
                                    {options.map((opt, oIdx) => (
                                        <label key={oIdx} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={opt.value}
                                                checked={answers[index] === opt.value}
                                                onChange={() => handleOptionChange(index, opt.value)}
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full mt-4"
                        disabled={loading}
                        title={loading ? 'Submitting...' : 'Submit Test'}
                    />
                </form>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold">Your Result</h2>
                    <p className="text-lg mt-2">Total Score: <strong>{totalScore}</strong></p>
                    <p className="text-xl mt-4">Stress Level: <strong>{stressLevel}</strong></p>
                    <Button className="mt-6" onClick={() => window.location.reload()} title="Retake Test" />
                </div>
            )}
        </div>
    );
}
