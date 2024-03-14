$(document).ready(function() {
    // Функция для обновления координат коннекторов при изменении размеров окна
    $(window).resize(function() {
        updateConnectors();
    });

    // Инициализация координат коннекторов при загрузке страницы
    updateConnectors();

    const allParticipants = document.querySelectorAll('.participant');

    allParticipants.forEach(participant => {
        participant.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.setAttribute('draggable', 'true');
                this.classList.add('draggable');
            } else {
                this.removeAttribute('draggable');
                this.classList.remove('draggable');
            }
        });

        participant.addEventListener('dragstart', function (event) {
            if (this.value.trim() !== '') {
                event.dataTransfer.setData('text/plain', this.value);
                event.dataTransfer.setData('text/html', this.outerHTML);
            }
        });

        participant.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        participant.addEventListener('drop', function (event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            if (this.value.trim() === '' && data.trim() !== '') {
                this.value = data;
                // Сохраняем значение в localStorage
                localStorage.setItem(this.id, this.value);
                // Удаляем данные из поля, из которого произошел перенос
                const draggedElementId = event.dataTransfer.getData('text/html');
                const originalElement = document.getElementById(draggedElementId);
                if (originalElement) {
                    originalElement.value = '';
                    // Удаляем значение из localStorage исходного элемента
                    localStorage.removeItem(originalElement.id);
                }
            } else if (this.value.trim() !== '' && data.trim() !== '') {
                // Если в поле уже есть текст, просто добавляем переносимый текст
                this.value += ' ' + data;
                // Сохраняем значение в localStorage
                localStorage.setItem(this.id, this.value);
                // Удаляем данные из поля, из которого произошел перенос
                const draggedElementId = event.dataTransfer.getData('text/html');
                const originalElement = document.getElementById(draggedElementId);
                if (originalElement) {
                    originalElement.value = '';
                    // Удаляем значение из localStorage исходного элемента
                    localStorage.removeItem(originalElement.id);
                }
            }
        });
    });

    // Загрузка сохраненных данных из localStorage
    allParticipants.forEach(participant => {
        const savedValue = localStorage.getItem(participant.id);
        if (savedValue) {
            participant.value = savedValue;
        }
    });

    // Обработчик события input для полей ввода
    allParticipants.forEach(participant => {
        participant.addEventListener('input', function () {
            // Сохранение значения поля в localStorage
            localStorage.setItem(participant.id, this.value);
        });
    });
});

// Функция для обновления координат коннекторов
function updateConnectors() {
    // Обновляем координаты коннектора от 1/16 к 1/8
    updateConnector('.round:nth-child(1) .match:nth-child(1)', '.round:nth-child(2) .match:nth-child(1)', '#connector1');
}

// Функция для обновления координат одного коннектора
function updateConnector(div1Selector, div2Selector, connectorId) {
    var div1 = $(div1Selector);
    var div2 = $(div2Selector);
    var connector = $(connectorId);

    var div1Offset = div1.offset();
    var div2Offset = div2.offset();

    var x1 = div1Offset.left + div1.outerWidth();
    var y1 = div1Offset.top + div1.outerHeight() / 2;
    var x2 = div2Offset.left;
    var y2 = div2Offset.top + div2.outerHeight() / 2;

    connector.css({
        'top': y1,
        'left': x1,
        'height': y2 - y1,
        'width': x2 - x1
    });
}
