"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, RotateCcw } from "lucide-react"

interface ExperimentScenario {
  id: string
  title: string
  description: string
  settings: {
    density: number
    volume: number
    depth: number
  }
  expectedOutcome: string
  learningGoal: string
}

const experimentScenarios: ExperimentScenario[] = [
  {
    id: "cork",
    title: "Cork in Water",
    description: "Test a cork (very light material) in water",
    settings: { density: 0.24, volume: 80, depth: 15 },
    expectedOutcome: "Floats high on surface",
    learningGoal: "Understand how very low density materials behave",
  },
  {
    id: "ice",
    title: "Ice Cube",
    description: "See how ice floats in water",
    settings: { density: 0.92, volume: 125, depth: 10 },
    expectedOutcome: "Floats with most submerged",
    learningGoal: "Learn why ice floats despite being solid water",
  },
  {
    id: "steel",
    title: "Steel Ball",
    description: "Drop a steel ball into water",
    settings: { density: 7.8, volume: 65, depth: 25 },
    expectedOutcome: "Sinks rapidly",
    learningGoal: "Observe high-density materials in water",
  },
  {
    id: "neutral",
    title: "Neutrally Buoyant Object",
    description: "An object with the same density as water",
    settings: { density: 1.0, volume: 100, depth: 20 },
    expectedOutcome: "Suspended in water",
    learningGoal: "Understand neutral buoyancy",
  },
  {
    id: "oil",
    title: "Oil Drop",
    description: "See how oil behaves in water",
    settings: { density: 0.85, volume: 150, depth: 8 },
    expectedOutcome: "Floats on surface",
    learningGoal: "Compare different liquid densities",
  },
]

interface ExperimentModeProps {
  onApplySettings: (settings: { density: number; volume: number; depth: number }) => void
}

export function ExperimentMode({ onApplySettings }: ExperimentModeProps) {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null)
  const [completedExperiments, setCompletedExperiments] = useState<Set<string>>(new Set())

  const handleRunExperiment = (scenario: ExperimentScenario) => {
    setSelectedExperiment(scenario.id)
    onApplySettings(scenario.settings)
    setCompletedExperiments((prev) => new Set([...prev, scenario.id]))
  }

  const handleReset = () => {
    setSelectedExperiment(null)
    setCompletedExperiments(new Set())
    onApplySettings({ density: 0.8, volume: 100, depth: 10 })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Experiment Mode
          <Button variant="outline" size="sm" onClick={handleReset} className="ml-auto bg-transparent">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Try these pre-configured experiments to explore different scenarios:
        </p>

        <div className="space-y-3">
          {experimentScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-3 rounded-lg border transition-colors ${
                selectedExperiment === scenario.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {scenario.title}
                    {completedExperiments.has(scenario.id) && (
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleRunExperiment(scenario)}
                  variant={selectedExperiment === scenario.id ? "default" : "outline"}
                >
                  {selectedExperiment === scenario.id ? "Running" : "Try It"}
                </Button>
              </div>

              <div className="text-xs space-y-1">
                <div className="flex gap-4">
                  <span>Density: {scenario.settings.density} g/cm³</span>
                  <span>Volume: {scenario.settings.volume} cm³</span>
                  <span>Depth: {scenario.settings.depth} cm</span>
                </div>
                <div className="text-muted-foreground">
                  <strong>Expected:</strong> {scenario.expectedOutcome}
                </div>
                <div className="text-muted-foreground">
                  <strong>Learn:</strong> {scenario.learningGoal}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Challenge:</strong> After trying all experiments, can you predict what will happen with different
            density values?
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
