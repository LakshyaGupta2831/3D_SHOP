import { proxy } from "valtio";

const state = proxy({
    intro:true,
    color:'#EFBD48',
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal:'./lgg.png',
    fullDecal:'./lgg.png'
});

export default state;