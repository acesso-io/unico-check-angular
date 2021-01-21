import { Component } from '@angular/core';
declare var AcessoWebFrame: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pocangular';

  constructor(){
    var acessoWebFrame = new AcessoWebFrame();

    const showCompletedAnimation = () => {
        document.getElementById('box--completed')!.style.display = 'inline-block';
    };

    const showLoadingModels = () => {
        document.getElementById('box--loading-models')!.style.display = 'inline-block';
    };

    const hideLoadingModels = () => {
        document.getElementById('box--loading-models')!.style.display = 'none';
    };

    const showError = (message = "Ops... Algo inesperado aconteceu!") => {
        document.getElementById('error-message')!.innerHTML = message;
        document.getElementById('box--error')!.style.display = 'inline-block';
    };

    const setTypeCamera = (_type: number) => {

        switch (_type) {
            case 1:
                acessoWebFrame.initCameraNormal('#fff');
                break;
            case 2:
                showLoadingModels();
                acessoWebFrame.acessoWebFrameModel.loadModelsCameraInteligence()
                    .then(() => {
                        hideLoadingModels();
                        acessoWebFrame.initCameraInteligence('#2980ff', '#ed2121', '#fff');
                    })
                    .catch((e: string | undefined) => {
                        showError(e);
                        console.log(e);
                    });
                break;
            case 3:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.CNH, '#fff');
                break;
            case 4:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG, '#fff');
                break;
            case 5:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.CPF, '#fff');
                break;
            case 6:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG, '#fff');
                break;
            case 7:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.OTHERS, '#fff', 'Título de eleitor');
                break;
            case 8:
                acessoWebFrame.initCameraNormal('#fff', acessoWebFrame.FACE_MODE_TYPE.BACK);
                break;
            case 9:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG_FRONT, '#fff');
                break;
            case 10:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.RG_BACK, '#fff');
                break;
            case 11:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG_FRONT, '#fff');
                break;
            case 12:
                acessoWebFrame.initDocument(acessoWebFrame.TYPE_DOCUMENT.NEW_RG_BACK, '#fff');
                break;
            default:
                acessoWebFrame.initCameraNormal('#fff');
        }
    };

    document.addEventListener("DOMContentLoaded", () => {

        function onSuccessCapture(obj: any) {
            showCompletedAnimation();
            console.log(obj);
        }

        function onFailedCapture(err: string) {
            if (err === "navigator.MediaDevices.getUserMedia error: Permission denied, NotAllowedError") {
                showError('Você negou o acesso a câmera. Procure pelo icone de câmera na barra de navegação e mude sua decisão.')
            }

            console.log(err);
        }

        function onBrowserNotSupport(obj: { listBrowsersSupport: string | any[]; }) {
            console.log(obj);
        };

        acessoWebFrame.onSuccessCaptureJS = onSuccessCapture;
        acessoWebFrame.onFailedCaptureJS = onFailedCapture;
        acessoWebFrame.onBrowserNotSupportJS = onBrowserNotSupport;

        /*para usar outros tipos de captura basta passar o número correto de acordo com o switch 
        1  - Camera Normal (Frontal)
        2  - Camera inteligente
        3  - Documentos (CNH)
        4  - Documentos (RG)
        5  - Documentos (CPF)
        6  - Documentos (NEW_RG)
        7  - Documentos (OTHERS)
        8  - Camera normal (Traseira)
        9  - Documentos (RG_FRONT)
        10 - Documentos (RG_BACK)
        11 - Documentos (NEW_RG_FRONT)
        12 - Documentos (NEW_RG_BACK)
        */
        setTypeCamera(2);
    });
  }
}
