"use client"

import { useState, useEffect } from "react"
import { PhysicsEngine, type SimulationObject, type SimulationResult } from "@/lib/physics-engine"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuizModal } from "@/components/quiz-modal"
import { TooltipHelper } from "@/components/tooltip-helper"
import { ExperimentMode } from "@/components/experiment-mode"
import { BookOpen, Play, RotateCcw, Trophy } from "lucide-react"

export default function PhysicsSimulation() {
  const [physicsEngine] = useState(() => new PhysicsEngine())
  const [object, setObject] = useState<SimulationObject>({
    volume: 100, // cm³
    density: 0.8, // g/cm³
    depth: 10, // cm
  })
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [experimentMode, setExperimentMode] = useState(false)

  // Run simulation whenever object properties change
  useEffect(() => {
    const simulationResult = physicsEngine.simulate(object)
    setResult(simulationResult)
  }, [object, physicsEngine])

  const handleStartSimulation = () => {
    setIsAnimating(true)
    // Reset animation after 2 seconds
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const handleReset = () => {
    setObject({
      volume: 100,
      density: 0.8,
      depth: 10,
    })
    setIsAnimating(false)
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore(score)
    setShowQuiz(false)
  }

  const handleExperimentSettings = (settings: { density: number; volume: number; depth: number }) => {
    setObject(settings)
  }

  const getFloatStateColor = (state: string) => {
    switch (state) {
      case "floating":
        return "bg-emerald-500"
      case "sinking":
        return "bg-red-500"
      case "suspended":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Physics Simulation: Buoyancy & Fluid Pressure</h1>
          <p className="text-muted-foreground text-lg">
            Explore how object density affects buoyancy and learn about fluid pressure
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => setShowQuiz(true)} variant="outline" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Take Quiz
              {quizScore !== null && (
                <Badge variant="secondary" className="ml-1">
                  <Trophy className="w-3 h-3 mr-1" />
                  {quizScore}/4
                </Badge>
              )}
            </Button>
            
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Water Tank Visualization */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Water Tank Simulation
                  <TooltipHelper
                    title="Water Tank"
                    content="This tank shows how objects behave in water based on their density. Objects lighter than water float, heavier objects sink, and objects with the same density as water remain suspended."
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-b from-blue-100 to-blue-400 rounded-lg h-96 overflow-hidden border-4 border-gray-600">
                  {/* Water level indicator */}
                  <div className="absolute top-4 left-4 text-blue-800 font-semibold">Water Level</div>

                  {/* Depth markers */}
                  <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-blue-800 py-4">
                    <span>0 cm</span>
                    <span>10 cm</span>
                    <span>20 cm</span>
                    <span>30 cm</span>
                  </div>

                  {/* Simulated object */}
                  <div
                    className={`absolute w-16 h-16 rounded-lg border-2 border-gray-800 transition-all duration-2000 ${
                      isAnimating ? "animate-bounce" : ""
                    } ${
                      result?.floatState === "floating"
                        ? "bg-yellow-400 top-20"
                        : result?.floatState === "sinking"
                          ? "bg-red-400 top-72"
                          : "bg-green-400 top-48"
                    }`}
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      top: result?.floatState === "floating" ? "20%" : result?.floatState === "sinking" ? "75%" : "50%",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold">
                      {object.density.toFixed(1)}
                    </div>
                  </div>

                  {/* Pressure indicator */}
                  <div className="absolute bottom-4 right-4 bg-white/80 rounded p-2">
                    <div className="text-sm font-semibold">Pressure at {object.depth}cm:</div>
                    <div className="text-lg font-bold text-primary">{result?.pressure.toFixed(1)} dynes/cm²</div>
                  </div>

                  {result && (
                    <div className="absolute top-4 right-4 bg-white/90 rounded p-2 max-w-xs">
                      <div className="text-xs">
                        <strong>Why {result.floatState}?</strong>
                        <br />
                        {result.floatState === "floating" && "Density < 1.0 g/cm³"}
                        {result.floatState === "sinking" && "Density > 1.0 g/cm³"}
                        {result.floatState === "suspended" && "Density = 1.0 g/cm³"}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Control Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Object Density */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    Object Density: {object.density.toFixed(2)} g/cm³
                    <TooltipHelper
                      title="Density"
                      content="Density is mass per unit volume. Water has a density of 1.0 g/cm³. Objects with lower density float, higher density sink."
                    />
                  </label>
                  <Slider
                    value={[object.density]}
                    onValueChange={([value]) => setObject((prev) => ({ ...prev, density: value }))}
                    min={0.1}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0.1 (very light)</span>
                    <span>2.0 (very heavy)</span>
                  </div>
                </div>

                {/* Object Volume */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    Object Volume: {object.volume} cm³
                    <TooltipHelper
                      title="Volume"
                      content="Volume affects how much water the object displaces, which determines the buoyant force according to Archimedes' principle."
                    />
                  </label>
                  <Slider
                    value={[object.volume]}
                    onValueChange={([value]) => setObject((prev) => ({ ...prev, volume: value }))}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50 cm³</span>
                    <span>500 cm³</span>
                  </div>
                </div>

                {/* Depth */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    Depth: {object.depth} cm
                    <TooltipHelper
                      title="Depth"
                      content="Depth affects pressure according to P = ρgh. Deeper locations have higher pressure, but don't affect whether an object floats or sinks."
                    />
                  </label>
                  <Slider
                    value={[object.depth]}
                    onValueChange={([value]) => setObject((prev) => ({ ...prev, depth: value }))}
                    min={5}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5 cm</span>
                    <span>30 cm</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-2">
                  <Button onClick={handleStartSimulation} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Simulation
                  </Button>
                  <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Display */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Results
                    <Badge className={getFloatStateColor(result.floatState)}>{result.floatState.toUpperCase()}</Badge>
                    <TooltipHelper
                      title="Results"
                      content="These calculations show the forces acting on your object and explain why it behaves the way it does."
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Weight:</span>
                      <div className="text-muted-foreground">{result.weight.toFixed(1)} dynes</div>
                    </div>
                    <div>
                      <span className="font-medium">Buoyant Force:</span>
                      <div className="text-muted-foreground">{result.buoyantForce.toFixed(1)} dynes</div>
                    </div>
                    <div>
                      <span className="font-medium">Net Force:</span>
                      <div className="text-muted-foreground">{result.netForce.toFixed(1)} dynes</div>
                    </div>
                    <div>
                      <span className="font-medium">Displaced Vol:</span>
                      <div className="text-muted-foreground">{result.displacementVolume.toFixed(1)} cm³</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{physicsEngine.getExplanation(result)}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {experimentMode && <ExperimentMode onApplySettings={handleExperimentSettings} />}
          </div>
        </div>

        {/* Formula Display */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Physics Formulas
              <TooltipHelper
                title="Formulas"
                content="These are the fundamental equations that govern buoyancy and fluid pressure. Understanding these helps predict object behavior in fluids."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Buoyant Force</h3>
                <p className="text-lg font-mono">F_b = ρ × V × g</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ρ = fluid density, V = displaced volume, g = gravity
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Pressure</h3>
                <p className="text-lg font-mono">P = ρ × g × h</p>
                <p className="text-sm text-muted-foreground mt-1">ρ = fluid density, g = gravity, h = depth</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Weight</h3>
                <p className="text-lg font-mono">W = m × g</p>
                <p className="text-sm text-muted-foreground mt-1">m = mass (ρ × V), g = gravity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} onComplete={handleQuizComplete} />
      </div>
    </div>
  )
}
