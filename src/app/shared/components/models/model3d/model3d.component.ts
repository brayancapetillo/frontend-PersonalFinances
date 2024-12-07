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
	private model!: THREE.Object3D
	private rotateForward = true // Variable para controlar la dirección de la rotación
	private maxRotation = 0 // Límite máximo de rotación (aproximadamente 22.5 grados)
	private minRotation = -1.8
	private scale: number = 1.25
	private referenceScale: number = 0.0016

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

		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000)
		this.camera.position.z = 10

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
		this.loader.load('../../../../assets/animations/3d/low_poly_foliage_test.glb', (gltf) => {
			this.model = gltf.scene
			this.model.position.set(0, -2, 0) // Ajusta la posición del modelo
			this.model.rotation.z = -0.1
			this.model.rotation.x = 0
			this.model.rotation.y = -2
			this.model.scale.set(this.scale, this.scale, this.scale)
			// model.traverse((child) => {
			// 	if (child instanceof THREE.Mesh) {
			// 		child.material = new THREE.MeshStandardMaterial({
			// 			color: 0xf7e38a,
			// 			metalness: 1,
			// 			roughness: 0.4
			// 		})
			// 	}
			// })
			this.scene.add(this.model)

			if (gltf.animations && gltf.animations.length > 0) {
				this.mixer = new THREE.AnimationMixer(this.model)
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

		if (this.model) {
			this.model.rotation.y += delta * 0.3
		}

		this.controls.update()

		this.renderer.render(this.scene, this.camera)
	}

	private setSize(): void {
		const container = document.getElementById('container-3d-login') as HTMLDivElement
		if (!container) return

		const scaleResize: number = container.offsetWidth * this.referenceScale
		const positiony: number = -1 * scaleResize

		if (this.model) {
			this.model.scale.set(scaleResize, scaleResize, scaleResize)
			this.model.position.set(0, positiony, 0) // Ajusta la posición del modelo
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
