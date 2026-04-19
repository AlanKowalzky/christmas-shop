Reviewer 1
2026-04-14 00:33
70
maximum score: 100
Соответствие макету на 1440px — выполнено частично (50%).
В целом структура страницы сохранена: основные секции, композиция и общий стиль совпадают с макетом. Цветовая палитра, отступы, скругления блоков и базовая сетка в целом близки к макету. При этом страница не соответствует макету полностью: заметны отличия в контенте и визуальных деталях.

Основные расхождения:

Hero section: отличается главный текст внутри шара и подписи.
About section: отличаются заголовок и описание.
Slider section: другой набор слов/карточек, отличается композиция слайдера и видимая область элементов.
Best Gifts section: отличаются названия карточек, категории и порядок контента.
CTA section: отличается текст, значения таймера и часть декоративных элементов.
Footer: отличается наполнение карточек, подписи, иконки и нижний текстовый блок.
Фоновый декоративный паттерн со снежинками/точками также визуально отличается по плотности и расположению.
Соответствие макету на 768px — выполнено частично (50%).

Соответствие макету на 380px — выполнено частично (50%).

Горизонтального скролла нет, контент не обрезается, не пропадает и не съезжает в сторону — выполнено полностью.

При плавном изменении ширины окна лэйаут занимает доступную ширину корректно, элементы перестраиваются без наложений, изображения сохраняют пропорции — выполнено полностью.

W3C validation — выполнено частично (6/12), так как валидатор показывает проблемы:

Bad value for attribute src on element img: Must be non-empty
Warning: Empty heading
Проблемные места:

<img src="" alt="" id="modal-img">
<h3 class="header-3" id="modal-title"></h3>
Итог: 70 из 100 Лэйаут и общая визуальная идея переданы близко к макету, но контент и ряд UI-деталей не совпадают, поэтому пункт “aligns the design” можно считать выполненным частично, а не полностью. При этом адаптивность реализована корректно: горизонтального скролла нет, плавный ресайз работает хорошо. Также есть замечания по W3C Validator, поэтому этот пункт тоже не может быть зачтён полностью.



Reviewer 2
2026-04-16 10:11
64
maximum score: 100
The layout of the pages aligns the design at a screen width of 1440px: 8 / 16
doesn't match the design
The layout of the pages aligns the design at a screen width of 768px: 8 / 16
doesn't match the design
The layout of the pages aligns the design at a screen width of 380px: 8 / 16
doesn't match the design
There is no horizontal scrollbar at all screen width up to 380px inclusive. All page content remains as per the design: it is not cropped, removed, or shifted to the side: 24 / 24
During smooth resizing of the browser window from 1440px to 380px, the layout occupies the full width of the window (including specified margins), elements adjust their sizes and positions appropriately without full scaling, no elements overlap, and images maintain their correct aspect ratios: 4 / 8
troubles with menu on small screens
At screen widths of 768px, the menu and navigation links in <header> are concealed on both pages, and a burger menu icon is displayed: 2 / 4
no burger menu button on gifts page
Hover effects are active on desktop devices (as per the Desktop device type in DevTools) and are disabled for mobile devices (as per the Mobile device type in DevTools) on both pages: 4 / 4
The layout for both pages is validated and error-free according to the W3C Validator: 6 / 12
error on the main page


Reviewer 3
2026-04-16 22:00
60
maximum score: 100
Does not match the layouts. validator error etc.

The task checklist doesn't work. can't copy mistakes


alankowalzky
student
2026-04-16 23:17
I dispute this score based on the provided criteria