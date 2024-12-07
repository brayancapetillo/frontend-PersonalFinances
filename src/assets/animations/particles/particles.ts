import { MoveDirection, OutMode, ParticlesOptions, RecursivePartial } from '@tsparticles/engine'

export const particlesOptionsConfig: RecursivePartial<ParticlesOptions> = {
	fpsLimit: 120,
	interactivity: {
		events: {
			onClick: {
				enable: false,
				mode: 'push'
			},
			onHover: {
				enable: true,
				mode: 'repulse'
			},
			resize: {
				enable: true
			}
		},
		modes: {
			push: {
				quantity: 4
			},
			repulse: {
				distance: 150,
				duration: 0.4
			},
			bubble: {
				distance: 450,
				duration: 0.4,
				size: 8
			}
		}
	},
	particles: {
		color: {
			value: '#f1d46c'
		},
		links: {
			color: '#f1d46c',
			distance: 150,
			enable: true,
			opacity: 0.8,
			width: 1
		},
		move: {
			direction: MoveDirection.none,
			enable: true,
			outModes: {
				default: OutMode.bounce
			},
			random: false,
			speed: 3,
			straight: false
		},
		number: {
			density: {
				enable: true,
				area: 800
			},
			value: 80
		},
		opacity: {
			value: 0.8
		},
		shape: {
			type: 'circle'
		},
		size: {
			value: { min: 1, max: 5 }
		}
	},
	detectRetina: true
}
