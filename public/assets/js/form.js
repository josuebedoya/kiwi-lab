const toggleClass = ( els, show ) => els?.forEach( el => el?.classList.toggle( "show", show ) );

const generateToken = async ( key ) => {
  let token = null;
  try {
    token = await grecaptcha.execute( key, { action: "LOGIN" } );
  } catch ( err ) {
    console.error( "Error generating reCAPTCHA token:", err );
  }

  return token;
}

const getEls = ( form ) => {
  const msg = form.querySelector( "#message" );
  const loading = form.querySelector( "#loading" );
  const loader = form.querySelector( "#loader" );

  if ( !loading || !msg || !loader ) return null;
  return { msg, loading, loader };
};

const submitForm = async ( form ) => {
  const dataForm = new FormData( form );

  const valueKeys = {
    recaptcha: await generateToken( form.dataset.recaptcha ), model: form.dataset.model, api: form.dataset.api,
  }

  try {
    dataForm.append( "recaptchaToken", valueKeys.recaptcha ); // Added token to form data
    dataForm.append( "model", valueKeys.model ); // model

    const res = await fetch( valueKeys.api, {
      method: "POST", body: dataForm,
    } );

    const data = await res.json();

    if ( data.success ) form.reset();

    return { ok: data.success, message: data.message || "Error al enviar" };

  } catch ( err ) {
    console.error( err );
    return { ok: false, message: "Error: No se pudo enviar." };
  }
}

document.addEventListener( "submit", async ( e ) => {
  const form = e?.target?.matches( "[data-form]" ) ? e.target : null;

  if ( !form ) {
    console.error( "Form not found" );
    return;
  }

  e.preventDefault();

  const els = getEls( form );

  if ( !els ) return;

  const { msg, loading, loader } = els;
  toggleClass( [ loading, loader ], true );

  const { ok, message } = await submitForm( form );

  msg.textContent = message;
  toggleClass( [ msg ], true );
  toggleClass( [ loading, loader ], false );

  if ( !ok ) {
    console.error( message );
  }
} );