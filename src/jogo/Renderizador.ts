import { AmbientLight, BoxGeometry, GridHelper, Light, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"


class Renderizador {

    //Padrão de Projeto - Singleton
    private static _instance = new Renderizador()
    public static get instance() {
        return this._instance
    }

    private _canvas: HTMLElement 
    private _renderizador: WebGLRenderer
    private _camera: PerspectiveCamera
    private _cena: Scene
    private _luzAmbiente: Light

    constructor() {
        this._canvas = document.getElementById("canvas-do-jogo") as HTMLElement
        this.configurarCena()
        this.configurarRenderizacao()
        this.configurarCamera()
        this.configurarIluminacao()
        this.carregarAtor()
    }

    private configurarRenderizacao() {
        this._renderizador = new WebGLRenderer({
            canvas: this._canvas,
            alpha: true
        })
        this._renderizador.setSize(window.innerWidth, window.innerHeight)
    }

    private configurarCamera(){
        this._camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this._camera.position.set(0,6,-3)
        this._camera.lookAt(0,0,0)
        this._cena.add(this._camera)
    }

    private configurarCena(){
        this._cena = new Scene()
    }

    private configurarIluminacao() {
        this._luzAmbiente = new AmbientLight(0xFFFFFF)
        this._cena.add(this._luzAmbiente)
    }

    private carregarAtor() {
        const boxGeometry = new BoxGeometry(1, 1, 1)
        const boxMaterial = new MeshStandardMaterial({color: 0xFF0000})
        const ator = new Mesh(boxGeometry, boxMaterial)

        const gridHelper = new GridHelper(10,10, 0x000000)
        
        this._cena.add(gridHelper)
        this._cena.add(ator)
    }

    public render = () => {
        requestAnimationFrame(this.render)
        this._renderizador.render(this._cena, this._camera)
    }
}

export default Renderizador