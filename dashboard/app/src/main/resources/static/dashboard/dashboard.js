class Dashboard {

    start() {
        console.log('start');
        const clippyButtons = document.querySelectorAll('.clippy');
        Array.from(clippyButtons).forEach(button => {
            button.addEventListener('click', (event) => this.onClippyButtonClick(event));
        });
    }

    onClippyButtonClick(event) {
        const targetQuery = event.target.getAttribute('data-clippy-target');
        console.log(event.target);
        if (!targetQuery) {
            return;
        }
        const targetElement = document.querySelector(targetQuery);
        if (!targetElement) {
            return;
        }
        targetElement.select();
        document.execCommand('copy');
    }
}

const app = new Dashboard();
window.addEventListener('load', () => app.start());