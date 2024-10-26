// URL вашего PDF-файла (замените на ваш путь к PDF-файлу)
const url = 'pdf/sample.pdf';
let pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1.5,
  canvas = document.getElementById('pdf-canvas'),
  ctx = canvas.getContext('2d'),
  canvasSecond = document.getElementById('pdf-canvas-second'), // Второй canvas
  ctxSecond = canvasSecond.getContext('2d');

// Load the PDF document
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page-count').textContent = pdfDoc.numPages;

  // Initial render of the first page
  renderPage(pageNum);
});

/**
 * Render the pages based on the current page number.
 * @param {number} num - Page number.
 */
function renderPage(num) {
  pageRendering = true;

  // Render the first page (current page number)
  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render the first page into the first canvas context
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);

    // Wait for rendering of the first page to finish
    renderTask.promise.then(function() {
      // If the screen is large enough, render the second page (num + 1) if it exists
      if (window.innerWidth > 768 && num + 1 <= pdfDoc.numPages) {
        renderSecondPage(num + 1);
      } else {
        canvasSecond.style.display = 'none'; // Hide the second canvas on smaller screens or if there's no second page
      }

      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page-num').textContent = num;
}

/**
 * Render the second page if available.
 * @param {number} num - Page number for the second page.
 */
function renderSecondPage(num) {
  canvasSecond.style.display = 'block';

  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvasSecond.height = viewport.height;
    canvasSecond.width = viewport.width;

    const renderContext = {
      canvasContext: ctxSecond,
      viewport: viewport
    };

    page.render(renderContext);
  });
}

/**
 * Queue page rendering if another render is in progress.
 * @param {number} num - Page number.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Display the previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }

  // Move two pages back if displaying two pages
  if (window.innerWidth > 768) {
    pageNum = Math.max(1, pageNum - 2);
  } else {
    pageNum--;
  }

  queueRenderPage(pageNum);
}

/**
 * Display the next page.
 */
function onNextPage() {
  if (window.innerWidth > 768) {
    // If displaying two pages, move two pages forward
    if (pageNum + 2 <= pdfDoc.numPages) {
      pageNum += 2;
    } else {
      return;
    }
  } else {
    // Move one page forward if displaying a single page
    if (pageNum < pdfDoc.numPages) {
      pageNum++;
    } else {
      return;
    }
  }

  queueRenderPage(pageNum);
}

// Add event listener for clicks on the canvas to navigate pages
canvas.addEventListener('click', function(event) {
  const clickX = event.offsetX;
  const canvasWidth = canvas.width;

  // Determine if the click was on the left or right side of the canvas
  if (clickX < canvasWidth / 2) {
    onPrevPage(); // Clicked on the left half - go to the previous page
  } else {
    onNextPage(); // Clicked on the right half - go to the next page
  }
});

// Add the same click event listener for the second canvas
canvasSecond.addEventListener('click', function(event) {
  const clickX = event.offsetX;
  const canvasWidth = canvasSecond.width;

  // Determine if the click was on the left or right side of the second canvas
  if (clickX < canvasWidth / 2) {
    onPrevPage(); // Clicked on the left half - go to the previous page
  } else {
    onNextPage(); // Clicked on the right half - go to the next page
  }
});