## LogicaMENTE - Um Aplicativo de Aprendizado de Programação Divertido

Este é um aplicativo React Native desenvolvido com Expo para aprendizado de programação de forma interativa e divertida.

### Como Executar o Projeto

Siga estas instruções para configurar e executar o projeto no seu ambiente local.

**Pré-requisitos:**

* **Node.js (LTS):** Certifique-se de ter o Node.js instalado no seu sistema. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/). Recomendamos a versão LTS (Long-Term Support).
* **npm ou yarn:** O npm é instalado por padrão com o Node.js. Você também pode usar o yarn, se preferir.
* **Expo CLI:** Instale o Expo CLI globalmente para poder executar comandos do Expo. Abra o seu terminal e execute:
    ```bash
    npm install -g expo-cli
    # ou
    yarn global add expo-cli
    ```
* **Conta no GitHub:** Você precisará de uma conta no [GitHub](https://github.com/).
* **VS Code (Opcional, mas recomendado):** Um bom editor de código como o Visual Studio Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)) facilitará o desenvolvimento.

**Passos:**

1.  **Clonar o Repositório do GitHub (No seu PC original):**
    * No seu PC onde o projeto está, navegue até a pasta onde você deseja armazenar o projeto.
    * Abra o terminal nessa pasta e execute o seguinte comando, substituindo `<seu-repositorio>` pelo nome do seu repositório no GitHub:
        ```bash
        git init
        git add .
        git commit -m "Primeiro commit do projeto LogicaMENTE"
        git remote add origin https://github.com/<seu-usuario>/<seu-repositorio>.git
        git branch -M main
        git push -u origin main
        ```
        Certifique-se de ter criado um repositório vazio com o mesmo nome no seu GitHub antes de executar o `git remote add origin`.

2.  **Baixar o Projeto no Novo PC:**
    * No seu novo PC, navegue até a pasta onde você deseja armazenar o projeto.
    * Abra o terminal nessa pasta e execute o comando para clonar o repositório do GitHub:
        ```bash
        git clone https://github.com/<seu-usuario>/<seu-repositorio>.git LogicaMENTEApp
        cd LogicaMENTEApp
        ```
        Substitua `<seu-usuario>` e `<seu-repositorio>` pelas suas informações do GitHub. `LogicaMENTEApp` será o nome da pasta local do projeto.

3.  **Instalar as Dependências:**
    * Dentro da pasta do projeto (`LogicaMENTEApp`), execute o seguinte comando para instalar todas as bibliotecas e dependências necessárias listadas no arquivo `package.json`:
        ```bash
        npm install
        # ou
        yarn install
        ```
        Este processo pode levar alguns minutos, dependendo da sua conexão com a internet.

4.  **Executar o Aplicativo com Expo:**
    * Após a instalação das dependências, execute o comando para iniciar o servidor de desenvolvimento do Expo:
        ```bash
        npx expo start
        # ou
        yarn start
        # ou
        expo start
        ```
    * Isso irá construir o seu aplicativo e abrir o Expo DevTools no seu navegador. Você também verá um QR code no terminal.

5.  **Visualizar o Aplicativo:**
    * **No seu celular (Android ou iOS):**
        * Certifique-se de ter o aplicativo **Expo Go** instalado no seu dispositivo. Você pode encontrá-lo na Google Play Store ou na App Store.
        * Abra o aplicativo Expo Go e use a opção de "Escanear QR Code" para ler o código que apareceu no seu terminal ou no Expo DevTools no navegador. O aplicativo deverá abrir em instantes no seu dispositivo.
    * **No emulador/simulador:**
        * Se você tem um emulador Android configurado ou o simulador do iOS (requer um Mac), você pode usar as opções no Expo DevTools no seu navegador para rodar o aplicativo neles (por exemplo, clicando em "Run on Android device/emulator" ou "Run on iOS simulator").
    * **Na Web:**
        * No Expo DevTools no seu navegador, procure pela opção "Run in web browser" e clique nela para abrir o aplicativo em uma aba do navegador.

Agora você deve conseguir executar o projeto LogicaMENTE no seu novo PC seguindo estas instruções. Lembre-se de que o servidor de desenvolvimento do Expo precisa estar rodando para visualizar o aplicativo no seu dispositivo, emulador ou navegador.

Link https://www.sitebrew.ai/xgU0AO