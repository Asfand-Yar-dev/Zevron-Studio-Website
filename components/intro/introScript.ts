/** Runs before first paint (inlined in app/layout.tsx): a repeat visit in this tab hides the intro,
 *  a first visit is remembered. Kept free of "<" and "&" because it is inlined as raw HTML. */
export const INTRO_SCRIPT = `try{if(sessionStorage.getItem("zv-intro"))document.documentElement.dataset.intro="seen";else sessionStorage.setItem("zv-intro","1")}catch(e){}`;
