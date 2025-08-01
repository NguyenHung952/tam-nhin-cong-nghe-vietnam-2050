document.addEventListener('DOMContentLoaded', function () {
    // Vẽ biểu đồ Chart.js
    const gasChartCanvas = document.getElementById('gasChart').getContext('2d');
    const gasChart = new Chart(gasChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Nồng độ khí gas (ppm)',
                data: [],
                borderColor: 'rgb(239, 68, 68)',
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Thời gian (giây)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'ppm'
                    },
                    suggestedMin: 0,
                    suggestedMax: 2000
                }
            }
        }
    });

    // Tạo dữ liệu mô phỏng realtime
    let gasConcentration = 400;
    let seconds = 0;
    let isLeaking = false;

    function updateChart() {
        if (gasChart.data.labels.length >= 30) {
            gasChart.data.labels.shift();
            gasChart.data.datasets[0].data.shift();
        }

        seconds += 1;
        const variation = isLeaking ? Math.random() * 30 + 20 : Math.random() * 10 - 5;
        gasConcentration += variation;
        gasConcentration = Math.max(0, Math.min(gasConcentration, 2000));

        gasChart.data.labels.push(seconds.toString());
        gasChart.data.datasets[0].data.push(gasConcentration);

        gasChart.update();

        // Cập nhật cảnh báo
        const status = document.getElementById('status');
        if (gasConcentration > 800) {
            status.textContent = '⚠️ Rò rỉ khí gas phát hiện!';
            status.classList.remove('text-green-600');
            status.classList.add('text-red-600', 'font-semibold');
        } else {
            status.textContent = '✅ Bình thường';
            status.classList.remove('text-red-600', 'font-semibold');
            status.classList.add('text-green-600');
        }
    }

    setInterval(updateChart, 1000);

    // Nút mô phỏng rò rỉ
    document.getElementById('leakBtn').addEventListener('click', function () {
        isLeaking = !isLeaking;
        this.textContent = isLeaking ? 'Dừng mô phỏng rò rỉ' : 'Bắt đầu mô phỏng rò rỉ';
        this.classList.toggle('bg-red-500', isLeaking);
        this.classList.toggle('bg-green-500', !isLeaking);
    });

    // Highlight sơ đồ khi click các thành phần
    const components = document.querySelectorAll('[data-component]');
    components.forEach(comp => {
        comp.addEventListener('click', () => {
            components.forEach(c => c.classList.remove('ring', 'ring-offset-2', 'ring-rose-400'));
            comp.classList.add('ring', 'ring-offset-2', 'ring-rose-400');

            const selectedLabel = comp.getAttribute('data-component');
            const infoBox = document.getElementById('component-info');
            const infoMap = {
                'sensor': 'Cảm biến MQ-2: phát hiện nồng độ khí gas.',
                'esp32': 'ESP32: vi điều khiển xử lý và gửi dữ liệu.',
                'fan': 'Quạt thông gió: bật khi phát hiện khí gas.',
                'server': 'Server: lưu và xử lý dữ liệu từ ESP32.',
                'dashboard': 'Dashboard: giao diện web trực quan.'
            };

            infoBox.textContent = infoMap[selectedLabel] || 'Chọn thành phần để xem thông tin.';
        });
    });
});
