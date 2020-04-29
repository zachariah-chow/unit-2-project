const pedalsSelect = document.querySelector('.single-pedalboard__pedals-list-select');
const addPedalBtn = document.querySelector('.single-pedalboard__pedals-list-add-btn');
const deletePedalBtns = document.querySelectorAll('.single-pedalboard__pedals-list-item-delete-btn');
const pedalsList = document.querySelector('.single-pedalboard__pedals-list');

deletePedalBtns.forEach(btn => {
    btn.addEventListener('click', async () => {

        const response = await sendHttpRequest('DELETE', `/pedalboards/${btn.dataset.pedalboardId}/${btn.dataset.gearId}`);

        const deletedPedal = document.querySelector(`.pedal-wrapper-${btn.dataset.gearId}`)

        pedalsList.removeChild(deletedPedal);
    })
})

addPedalBtn.addEventListener('click', async () => {
    const pedalEls = document.querySelectorAll('.single-pedalboard__pedal-wrapper');

    const response = await sendHttpRequest('POST', `/pedalboards/${pedalsSelect.dataset.pedalboardId}/${pedalsSelect.value}`, {
        gearOrder: pedalEls.length + 1
    }, { 'Content-Type': 'application/json' });

    console.log(response);

    const newPedalEl = document.createElement('div');
    newPedalEl.classList.add('single-pedalboard__pedal-wrapper');
    newPedalEl.classList.add(`pedal-wrapper-${response.pedalboard['gear_id']}`);
    newPedalEl.setAttribute('data-gear-id', `${response.pedalboard['gear_id']}`);
    newPedalEl.innerHTML = `
        <li data-pedal-pedalboard-id=${response.pedalboard['pedalboard_id']} class="edit-form__pedals-list-item">
            ${response.newPedal.name}
        </li>
        <div class="single-pedal__img-container">
            <img src=${response.newPedal["img_link"]} alt={pedal.name} class="single-pedal__img"/>
        </div>
        <button type="button" data-pedalboard-id=${response.pedalboard['pedalboard_id']} data-pedal-id=${response.pedalboard.id} data-gear-id=${response.newPedal.id} class="single-pedalboard__pedals-list-item-delete-btn">Delete</button>
    `

    pedalsList.append(newPedalEl);

    const newPedalDeleteBtn = document.querySelector(`button[data-gear-id='${response.newPedal.id}']`);

    newPedalDeleteBtn.addEventListener('click', async (ev) => {

        const response = await sendHttpRequest('DELETE', `/pedalboards/${ev.target.dataset.pedalboardId}/${ev.target.dataset.gearId}`);

        const deletedPedal = document.querySelector(`.pedal-wrapper-${ev.target.dataset.gearId}`)

        pedalsList.removeChild(deletedPedal);

    })
})