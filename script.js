function generateContent () {
  const container = document.getElementById('content-container');
  container.innerHTML = 
`<div class="button-container">

<button class="button-section-servey" onclick="location.href='flashcardsAirolo.html'">
  <img src="img/bereits-am-12-november-gibt-978841.jpg">
  <p>
    Zugvorbereitung in Airolo
  </p>
</button>

<button class="button-section-servey">
  <img src="img/Grammatik-1-scaled.jpg">
  <p>Grammatik (coming soon)</p>
</button>

<button class="button-section-servey">
  <img src="img/verben-liste-708-bild.jpg">
  <p>Verben im Präsenz (coming soon)</p>
</button>

<button class="button-section-servey">
  <img src="img/maxresdefault.jpg">
  <p>Das Substantiv (coming soon)</p>
</button>

<button class="button-section-servey">
   <img src="img/360_F_96340329_kZnyptiIhIExqYWJRvDjonzp0YMqqjfQ.jpg">
  <p>Die Pluralbildung (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/images.png">
  <p>Der Artikel (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/prep-di-mind-map.001.webp">
  <p>Die Präposition "di" (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/large-group-of-people-of-different-nationality-ethnicity-and-age-isolated-on-white-background-children-adults-and-teenagers-stand-together-illustration-vector.jpg">
  <p>Nationalität (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/Thumbnail_Jahreszeiten-1024x576.png">
  <p>Die Jahreszeiten (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/csm_shutterstock_1082692166_gespiegelt_8896b83bee.jpg">
  <p>Bahntechnik (coming soon)</p>
</button>

<button class="button-section-servey">
<img src="img/sprachtraining-unternehmen-digitale-welt-header-image.jpg">
  <p>Sprachtraining (coming soon)</p>
</button>

</div>`;
}

window.addEventListener('DOMContentLoaded', generateContent);


// Получаем элементы
const modal = document.getElementById('about-modal');
const openBtn = document.getElementById('about-btn');
const closeBtn = document.querySelector('.close-btn');

// Открытие модального окна при нажатии на кнопку "About"
openBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Предотвращаем переход по ссылке
  modal.style.display = 'block';
});

// Закрытие модального окна при нажатии на крестик
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});