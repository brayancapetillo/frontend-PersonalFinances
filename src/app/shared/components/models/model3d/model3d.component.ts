/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, HostListener, OnInit } from '@angular/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
	selector: 'app-model3d',
	standalone: true,
	imports: [],
	templateUrl: './model3d.component.html',
	styleUrl: './model3d.component.scss'
})
export class Model3dComponent implements OnInit {
	private loader = new GLTFLoader()
	private renderer!: THREE.WebGLRenderer
	private scene!: THREE.Scene
	private camera!: THREE.PerspectiveCamera
	private mixer!: THREE.AnimationMixer
	private clock = new THREE.Clock()
	private controls!: OrbitControls

	ngOnInit(): void {
		this.initThree()
		this.animate()
		this.setSize()
	}

	private initThree(): void {
		const canvas = document.getElementById('container3d') as HTMLCanvasElement
		if (!canvas) {
			return
		}

		this.scene = new THREE.Scene()

		this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 2000)
		this.camera.position.z = 25

		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			alpha: true
		})

		const ambientLight = new THREE.AmbientLight(0xffffff, 2)
		this.scene.add(ambientLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
		directionalLight.position.set(500, 500, 500)
		this.scene.add(directionalLight)

		this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
		this.loader.load('../../../../assets/animations/3d/treasure-island.glb', (gltf) => {
			const model = gltf.scene

			// model.position.y = -10
			// model.position.y = 0.5
			// model.position.set(0, -10, 0)
			model.scale.set(0.1, 0.1, 0.1)
			// model.traverse((child) => {
			// 	if (child instanceof THREE.Mesh) {
			// 		child.material = new THREE.MeshStandardMaterial({
			// 			color: 0xf7e38a,
			// 			metalness: 1,
			// 			roughness: 0.4
			// 		})
			// 	}
			// })
			this.scene.add(model)

			if (gltf.animations && gltf.animations.length > 0) {
				this.mixer = new THREE.AnimationMixer(model)
				this.mixer.clipAction(gltf.animations[0]).play()
			}
		})

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.25
		this.controls.screenSpacePanning = false
		this.controls.maxPolarAngle = Math.PI / 2
	}

	private animate(): void {
		requestAnimationFrame(() => this.animate())

		const canvas = document.getElementById('container3d') as HTMLCanvasElement
		if (!canvas) {
			return
		}

		const delta = this.clock.getDelta()

		if (this.mixer) {
			this.mixer.update(delta)
		}

		this.controls.update()

		this.renderer.render(this.scene, this.camera)
	}

	private setSize(): void {
		const container = document.getElementById('container-3d-login') as HTMLDivElement
		if (!container) {
			return
		}

		this.renderer.setSize(container.offsetWidth, container.offsetHeight)
		this.camera.aspect = container.offsetWidth / container.offsetHeight
		this.camera.updateProjectionMatrix()
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.setSize() // Adjust size on resize
	}
}
