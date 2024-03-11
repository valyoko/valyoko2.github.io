document.addEventListener('DOMContentLoaded', function () {
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
    });

    allParticipants.forEach(participant => {
        participant.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        participant.addEventListener('drop', function (event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            if (this.value.trim() === '' && data.trim() !== '') {
                this.value = data;
                // Удаляем данные из поля, из которого произошел перенос
                const draggedElementId = event.dataTransfer.getData('text/html');
                const originalElement = document.getElementById(draggedElementId);
                if (originalElement) {
                    originalElement.value = '';
                }
            } else if (this.value.trim() !== '' && data.trim() !== '') {
                // Если в поле уже есть текст, просто добавляем переносимый текст
                this.value += ' ' + data;
                // Удаляем данные из поля, из которого произошел перенос
                const draggedElementId = event.dataTransfer.getData('text/html');
                const originalElement = document.getElementById(draggedElementId);
                if (originalElement) {
                    originalElement.value = '';
                }
            }
        });
    });
});
