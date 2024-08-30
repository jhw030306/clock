document.addEventListener('DOMContentLoaded', () => {
    let batteryLevel = 100;
    const batteryElement = document.getElementById('battery');
    const numElements = document.querySelectorAll('.num');
    const dateElement = document.getElementById('current-date');
    const addAlarmButton = document.getElementById('add-alarm');
    const alarmBoxElement = document.getElementById('alarm-box');
    const alarms = [];

    function updateBattery() {
        batteryElement.textContent = `${batteryLevel}%`;
        if (batteryLevel <= 0) {
            // 배터리가 0%일 때 시간 숫자에 hidden 클래스 추가
            numElements.forEach(el => el.classList.add('hidden'));
        } else {
            // 배터리 수준이 0%가 아닐 때 기본 색상으로 복원
            numElements.forEach(el => el.classList.remove('hidden'));
        }
    }

    function decreaseBattery() {
        if (batteryLevel > 0) {
            batteryLevel -= 1;
            updateBattery();
        }
    }

    function addAlarm(hour, minute, second) {
        if (alarms.length >= 3) {
            alert('알람은 최대 3개까지 설정할 수 있습니다.');
            return;
        }
        alarms.push({ hour, minute, second });
        updateAlarmBox();
    }

    function removeAlarm(index) {
        alarms.splice(index, 1); // 지정한 인덱스의 알람 제거
        updateAlarmBox();
    }

    function updateAlarmBox() {
        alarmBoxElement.innerHTML = alarms.map((alarm, index) => 
            `<div class="alarm-item" data-index="${index}">
                ${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')}:${String(alarm.second).padStart(2, '0')}
            </div>`
        ).join('');

        // 각 알람 항목에 클릭 이벤트 리스너 추가
        document.querySelectorAll('.alarm-item').forEach(item => {
            item.addEventListener('click', (event) => {
                const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
                removeAlarm(index);
            });
        });
    }

    function updateDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        dateElement.textContent = `${year}-${month}-${day}`;
    }

    addAlarmButton.addEventListener('click', () => {
        const hour = parseInt(document.getElementById('alarm-hour').value, 10);
        const minute = parseInt(document.getElementById('alarm-minute').value, 10);
        const second = parseInt(document.getElementById('alarm-second').value, 10);

        // 유효성 검사
        if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
            alert('모든 필드를 올바르게 입력하세요.');
            return;
        }

        if (hour < 0 || hour > 23) {
            alert('시간은 0에서 23 사이의 값이어야 합니다.');
            return;
        }

        if (minute < 0 || minute > 59) {
            alert('분은 0에서 59 사이의 값이어야 합니다.');
            return;
        }

        if (second < 0 || second > 59) {
            alert('초는 0에서 59 사이의 값이어야 합니다.');
            return;
        }

        addAlarm(hour, minute, second);
    });

    setInterval(() => {
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let d = hour < 12 ? "AM" : "PM"; 
        hour = hour % 12 || 12;
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        document.querySelector(".hour_num").innerText = hour;
        document.querySelector(".min_num").innerText = min;
        document.querySelector(".sec_num").innerText = sec;
        document.querySelector(".am_pm span").innerText = d;

        // 현재 날짜 업데이트
        updateDate();
    }, 1000);

    setInterval(decreaseBattery, 1000); // 배터리 수준 1초마다 감소
});
