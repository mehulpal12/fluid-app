"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (score: number) => void
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "If an object has a density of 0.8 g/cm³, what will happen when placed in water?",
    options: ["It will sink", "It will float", "It will remain suspended", "It depends on the volume"],
    correctAnswer: 1,
    explanation:
      "Objects with density less than water (1.0 g/cm³) will float because the buoyant force exceeds their weight.",
  },
  {
    id: "2",
    question: "What happens to pressure as you go deeper in a fluid?",
    options: ["It decreases", "It stays the same", "It increases", "It becomes zero"],
    correctAnswer: 2,
    explanation: "Pressure increases with depth according to P = ρgh, where h is the depth.",
  },
  {
    id: "3",
    question: "An object with density equal to water (1.0 g/cm³) will:",
    options: ["Float on the surface", "Sink to the bottom", "Remain suspended at any depth", "Bounce up and down"],
    correctAnswer: 2,
    explanation:
      "When densities are equal, the buoyant force exactly balances the weight, so the object remains suspended.",
  },
  {
    id: "4",
    question: "Which force is responsible for objects floating?",
    options: ["Gravitational force", "Buoyant force", "Magnetic force", "Friction force"],
    correctAnswer: 1,
    explanation: "Buoyant force, discovered by Archimedes, pushes upward on objects submerged in fluids.",
  },
]

export function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
      onComplete(score)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Physics Quiz
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {!quizComplete ? (
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-3 text-left rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? index === question.correctAnswer
                          ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : showExplanation && index === question.correctAnswer
                          ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                          : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showExplanation && (
                        <>
                          {index === question.correctAnswer && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                          {selectedAnswer === index && index !== question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Close Quiz
              </Button>
              {showExplanation && (
                <Button onClick={handleNext}>
                  {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-lg">
                Your Score:{" "}
                <span className="font-bold text-primary">
                  {score}/{quizQuestions.length}
                </span>
              </p>
              <p className="text-muted-foreground mt-2">
                {score === quizQuestions.length
                  ? "Perfect! You have mastered buoyancy and pressure concepts!"
                  : score >= quizQuestions.length * 0.7
                    ? "Great job! You have a good understanding of the concepts."
                    : "Keep practicing! Try the simulation more to better understand the concepts."}
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button onClick={handleRestart}>Retake Quiz</Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
