// Core physics calculations for buoyancy and fluid pressure simulation

export interface SimulationObject {
  volume: number // in cm³
  density: number // in g/cm³
  depth: number // in cm
}

export interface FluidProperties {
  density: number // water density: 1.0 g/cm³
  gravity: number // 9.81 m/s² or 981 cm/s²
}

export interface SimulationResult {
  buoyantForce: number
  weight: number
  netForce: number
  pressure: number
  floatState: "floating" | "sinking" | "suspended"
  displacementVolume: number
}

export class PhysicsEngine {
  private fluid: FluidProperties = {
    density: 1.0, // g/cm³ (water)
    gravity: 981, // cm/s² for easier calculations with cm units
  }

  /**
   * Calculate buoyant force using Archimedes' principle
   * F_b = ρ_fluid × V_displaced × g
   */
  calculateBuoyantForce(displacedVolume: number): number {
    return this.fluid.density * displacedVolume * this.fluid.gravity
  }

  /**
   * Calculate object weight
   * W = m × g = ρ_object × V_object × g
   */
  calculateWeight(object: SimulationObject): number {
    return object.density * object.volume * this.fluid.gravity
  }

  /**
   * Calculate fluid pressure at depth
   * P = ρ × g × h
   */
  calculatePressure(depth: number): number {
    return this.fluid.density * this.fluid.gravity * depth
  }

  /**
   * Determine displaced volume based on object state
   */
  calculateDisplacedVolume(object: SimulationObject): number {
    if (object.density < this.fluid.density) {
      // Floating: only part of object is submerged
      return (object.density / this.fluid.density) * object.volume
    } else {
      // Sinking or suspended: entire object is submerged
      return object.volume
    }
  }

  /**
   * Run complete simulation for an object
   */
  simulate(object: SimulationObject): SimulationResult {
    const displacementVolume = this.calculateDisplacedVolume(object)
    const buoyantForce = this.calculateBuoyantForce(displacementVolume)
    const weight = this.calculateWeight(object)
    const netForce = buoyantForce - weight
    const pressure = this.calculatePressure(object.depth)

    let floatState: "floating" | "sinking" | "suspended"

    if (object.density < this.fluid.density) {
      floatState = "floating"
    } else if (object.density > this.fluid.density) {
      floatState = "sinking"
    } else {
      floatState = "suspended"
    }

    return {
      buoyantForce,
      weight,
      netForce,
      pressure,
      floatState,
      displacementVolume,
    }
  }

  /**
   * Get formatted results for display
   */
  getFormattedResults(result: SimulationResult) {
    return {
      buoyantForce: `${result.buoyantForce.toFixed(2)} dynes`,
      weight: `${result.weight.toFixed(2)} dynes`,
      netForce: `${result.netForce.toFixed(2)} dynes`,
      pressure: `${result.pressure.toFixed(2)} dynes/cm²`,
      floatState: result.floatState,
      displacementVolume: `${result.displacementVolume.toFixed(2)} cm³`,
    }
  }

  /**
   * Educational explanations for different scenarios
   */
  getExplanation(result: SimulationResult): string {
    switch (result.floatState) {
      case "floating":
        return `The object floats because its density (${result.weight / (result.displacementVolume * this.fluid.gravity).toFixed(2)} g/cm³) is less than water's density (1.0 g/cm³). Only part of the object is submerged.`
      case "sinking":
        return `The object sinks because its density is greater than water's density (1.0 g/cm³). The buoyant force is not strong enough to support the object's weight.`
      case "suspended":
        return `The object remains suspended because its density equals water's density (1.0 g/cm³). The buoyant force exactly balances the object's weight.`
      default:
        return ""
    }
  }
}
