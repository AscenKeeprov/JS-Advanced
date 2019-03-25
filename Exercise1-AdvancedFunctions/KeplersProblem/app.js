function calculateEccentricAnomaly(meanAnomalyInRad, eccentricity) {
	/* Set initial eccentric anomaly to be equal to current mean anomaly before starting approximation */
	let E0 = meanAnomalyInRad;
	/* Set maximum number of allowed iterations. 
	 * Change, depending on input, to achieve better approximation */
	let maxIterations = 64;
	/* Set desired calculations accuracy */
	let accuracy = Math.pow(10, -9);
	return Number(approximate(E0, eccentricity, 0).toFixed(9));
	function approximate(Ei, eccentricity, iteration) {
		/* Calculate mean anomaly at iteration [i] */
		let Mi = Ei - eccentricity * Math.sin(Ei);
		/* Calculate eccentric anomaly approximation at iteration [i] */
		let Ai = Math.abs(meanAnomalyInRad - Mi);
		/* Stop approximation if eccentric anomaly [i] is insignificantly different from mean anomaly [i]
		 * or calculation has exceeded the maximum number of allowed iterations */
		if (Ai < accuracy || iteration > maxIterations) return Ei;
		/* Continue approximation of eccentric anomaly [i+1] */
		let Eip1 = Ei - (Mi - meanAnomalyInRad) / (1 - eccentricity * Math.cos(Ei));
		return approximate(Eip1, eccentricity, ++iteration);
	}
}

calculateEccentricAnomaly(0.25, 0.99);
calculateEccentricAnomaly(4.8, 0.2);
calculateEccentricAnomaly(3.1415926535, 0.75);
calculateEccentricAnomaly(1, 0);
