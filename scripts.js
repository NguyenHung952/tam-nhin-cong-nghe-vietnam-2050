const PALETTE = {
    blue: '#00A6FB',
    orange: '#F37748',
    pink: '#E83F6F',
    green: '#22B573',
    lightGray: '#F7F7F7',
    darkGray: '#333333'
};

function wrapLabel(label, maxWidth = 16) {
    if (typeof label !== 'string' || label.length <= maxWidth) {
        return label;
    }
    const words = label.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + ' ' + word).length > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            if (currentLine.length > 0) {
                currentLine += ' ' + word;
            } else {
                currentLine = word;
            }
        }
    }
    lines.push(currentLine);
    return lines;
}

const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
        return label.join(' ');
    }
    return label;
};

const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: PALETTE.darkGray,
                font: {
                    family: "'Be Vietnam Pro', sans-serif"
                }
            }
        },
        tooltip: {
            callbacks: {
                title: tooltipTitleCallback
            },
            backgroundColor: PALETTE.darkGray,
            titleFont: { family: "'Be Vietnam Pro', sans-serif", size: 14 },
            bodyFont: { family: "'Be Vietnam Pro', sans-serif", size: 12 },
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: '#e0e0e0'
            },
            ticks: {
                color: PALETTE.darkGray,
                font: {
                    family: "'Be Vietnam Pro', sans-serif"
                }
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: PALETTE.darkGray,
                font: {
                    family: "'Be Vietnam Pro', sans-serif"
                }
            }
        }
    }
};

const electronicsExportData = {
    labels: ['2022', '2023', '2024', '2025 (Dự kiến)'],
    datasets: [{
        label: 'Kim ngạch xuất khẩu (Tỷ USD)',
        data: [115, 125, 134.5, 150],
        borderColor: PALETTE.blue,
        backgroundColor: 'rgba(0, 166, 251, 0.2)',
        fill: true,
        tension: 0.4
    }]
};
new Chart(document.getElementById('electronicsExportChart'), {
    type: 'line',
    data: electronicsExportData,
    options: commonChartOptions
});

const telecomMarketData = {
    labels: ['2024', '2026', '2028', '2030', '2033 (Dự kiến)'],
    datasets: [{
        label: 'Quy mô thị trường (Tỷ USD)',
        data: [6.49, 6.7, 6.9, 7.1, 7.32],
        borderColor: PALETTE.green,
        backgroundColor: 'rgba(34, 181, 115, 0.2)',
        fill: true,
        tension: 0.4
    }]
};
new Chart(document.getElementById('telecomMarketChart'), {
    type: 'line',
    data: telecomMarketData,
    options: commonChartOptions
});

const tradePartnersData = {
    labels: ['Hoa Kỳ', 'Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'EU'],
    datasets: [{
        label: 'Thị phần xuất khẩu (%)',
        data: [29, 18, 12, 10, 8],
        backgroundColor: PALETTE.blue,
        borderColor: PALETTE.blue,
        borderWidth: 1
    }, {
        label: 'Thị phần nhập khẩu (%)',
        data: [10, 20, 22, 14, 5],
        backgroundColor: PALETTE.orange,
        borderColor: PALETTE.orange,
        borderWidth: 1
    }]
};
new Chart(document.getElementById('tradePartnersChart'), {
    type: 'bar',
    data: tradePartnersData,
    options: {
        ...commonChartOptions,
        scales: {
            ...commonChartOptions.scales,
            x: {
                ...commonChartOptions.scales.x,
                ticks: {
                    ...commonChartOptions.scales.x.ticks,
                    callback: function(value, index, values) {
                        return wrapLabel(this.getLabelForValue(value));
                    }
                }
            }
        }
    }
});

const exportCompositionData = {
    labels: ['Điện thoại thông minh', 'Máy tính & Linh kiện', 'Đồ gia dụng', 'Khác'],
    datasets: [{
        label: 'Thị phần',
        data: [40, 25, 15, 20],
        backgroundColor: [
            PALETTE.blue,
            PALETTE.green,
            PALETTE.orange,
            PALETTE.pink,
        ],
        hoverOffset: 4
    }]
};
new Chart(document.getElementById('exportCompositionChart'), {
    type: 'doughnut',
    data: exportCompositionData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: PALETTE.darkGray,
                    font: {
                        family: "'Be Vietnam Pro', sans-serif"
                    },
                    boxWidth: 20
                }
            },
            tooltip: {
                callbacks: {
                    title: tooltipTitleCallback
                },
                backgroundColor: PALETTE.darkGray,
                titleFont: { family: "'Be Vietnam Pro', sans-serif", size: 14 },
                bodyFont: { family: "'Be Vietnam Pro', sans-serif", size: 12 },
            }
        }
    }
});
