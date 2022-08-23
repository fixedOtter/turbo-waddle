const butInstall = document.getElementById('buttonInstall');
let laterInstall;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  laterInstall = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (laterInstall !== null) {
    laterInstall.prompt();
    const { outcome } = await laterInstall.userChoice;
    if (outcome === 'accepted') {
        laterInstall = null;
    }
}
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => console.log('code injected to user machine! (app installed ;))'));
