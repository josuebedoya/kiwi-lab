const messageEmpty = ( text ) => {
  return `<div class="error p-3"><i class="fa-chisel fa-regular fa-magnifying-glass"></i><p>${ text }</p></div>`
}

const getSearch = async ( form ) => {
  const formData = new FormData( form );
  const valueKeys = {
    modelsConfig: form.dataset.modelsConfig || null, value: formData.get( 'q' ) ?? '', api: form.dataset.api,
  }

  try {
    // Build query params
    const params = new URLSearchParams( {
      q: valueKeys.value, modelsConfig: valueKeys.modelsConfig,
    } );

    const res = await fetch( `${ valueKeys.api }?${ params.toString() }` );
    const data = await res.json();

    if ( !data.success ) return {
      ok: false, message: data.message || "Algo fallo intentando realizar la busqueda", data: null
    };

    return { ok: data.success, message: null, data };

  } catch ( err ) {
    console.error( err );
    return { ok: false, message: "Algo fallo intentando realizar la busqueda", data: null };

  }
}

let activeResults = null;

// Listener to forms
document.addEventListener( "submit", async ( e ) => {
  const form = e?.target?.matches( "[data-form-search]" ) ? e.target : null;
  if ( !form ) {
    console.info( "Form Search not use" );
    return;
  }

  e.preventDefault();

  const { ok, message, data } = await getSearch( form );
  const resultContainer = form.querySelector( "#result" );
  if ( !resultContainer ) return;

  activeResults = resultContainer;
  resultContainer.classList.add( "show" );

  if ( !ok || !data || data.length <= 0 ) {
    resultContainer.innerHTML = messageEmpty( message );
    return null;
  }

  const { data: { blog_items: items = [] } } = data;

  if ( !items || items.length <= 0 ) {
    resultContainer.innerHTML = messageEmpty( "No se encontraron resultados." );
    return null;
  }

  // Mapping data response
  resultContainer.innerHTML = "";
  items?.forEach( item => {
    resultContainer.innerHTML += `
      <div class="result-item">
          <div class="px-3 py-2">
              <a href="/blog/${ item?.category?.slug }/${ item?.slug }">
                ${ item?.title }
              </a>
              <a href="/blog/${ item?.category?.slug }"><strong>${ item?.category?.title }</strong></a>
          </div>
      </div>
    `;
  } );
} );

// Handler click outside results
document.addEventListener( "click", ( event ) => {
  if ( !activeResults ) return;

  if ( !activeResults.contains( event.target ) ) {
    activeResults.classList.remove( "show" );
  }
} );