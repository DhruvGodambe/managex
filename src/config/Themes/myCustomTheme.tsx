import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: '...'
  },
  colors: {
    accentColor: 'linear-gradient(97.3deg, #1386F0 0%, #1673FF 100%)', // #1473F5  background color of connect wallet button
    accentColorForeground: '#FFFFFF', // #FFFFFF  font color of connect wallet button
    actionButtonBorder: '#192C45', //#112135 border color of close modal X at the top of choose wallet modal
    actionButtonBorderMobile: '#192C45', // border color of  get a wallet and learn more button on mobile
    actionButtonSecondaryBackground: '#1DB4F4', //#1DB4F4   color of open button when wallet connect is chosen as wallet
    closeButton: '#ffffff', // the X button at the top right serving as close modal , this is the color of X
    closeButtonBackground: '#192C45', // the X button at the top right serving as close modal , this is the color of X background
    connectButtonBackground: '#192C45', // shows background color of chain button after its connected
    connectButtonBackgroundError: 'linear-gradient(97.3deg, #1386F0 0%, #1673FF 100%)', // background of button which shows error with wrong chain connected
    connectButtonInnerBackground: '#192C45', //  background of address button when chain is connected
    connectButtonText: '#ffffff', // #ffffff ,  font color of address and chain which shows when wallet is connected
    connectButtonTextError: '#ffffff', // font color of button which shows wrong network when unsupported chain is connected
    connectionIndicator: '#00ff00', //  connect circle color of connected chain when switching chains
    downloadBottomCardBackground: '#192C45', // color of background of bottom card when user clicks Learn more , get a wallet
    downloadTopCardBackground: '#192C45', //  color of background of top card when user clicks Learn more , get a wallet
    error: '#ffffff', // #f9fc1c color of disconnect text when switching to right chain
    generalBorder: '#ffffff', // color of line above new to ethereum wallets when which wallet to connect is chosen
    generalBorderDim: '#ffffff', //  color of  line above disconnect when switching to right chain after an error
    menuItemBackground: '#1DB4F4', // #1DB4F4 this is the color of menu items(wallets) when you hover over them
    modalBackdrop: 'transparent', // #112135 when which wallet to connect modal is open , this is the background color around modal
    modalBackground: '#161A2D', //#161A2D  color of menu items (wallets) when they pop up
    modalBorder: '#161A2D', // #161A2D  border of modal which opens when connect wallet is clicked
    modalText: '#F5F9FB', // #F5F9FB  font color of text written when modal opens on click of connect button
    modalTextDim: '#00ff00', // left
    modalTextSecondary: '#F5F9FB', // #F5F9FB  font color of new to ethereum text in modal on click of connect button
    profileAction: '#0000ff', //  when copying or disconnecting connected address , this is the button color of options of copy and disconnect wallet
    profileActionHover: '#1DB4F4', // #1DB4F4 , when copying or disconnecting connected address , this is the button color on hover of options of copy and disconnect wallet
    profileForeground: '#192C45', // #f5f18e , when copying or disconnecting connected address ,. this is the background color of the modal
    selectedOptionBorder: '#192C45', //  border color of selected network when switching network modal is open
    standby: '#00ff00' // #00ff00  connect circle color of newly selected chain when switching chains
  },
  fonts: {
    body: 'Poppins, sans-serif'
  },
  radii: {
    actionButton: '4px',
    connectButton: '4px',
    menuButton: '4px',
    modal: '4px',
    modalMobile: '4px'
  },
  shadows: {
    connectButton: '...',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...'
  }
};

export default myCustomTheme;