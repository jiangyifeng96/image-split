const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// 确保输出目录存在
const outputDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 生成favicon
function generateFavicon() {
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext('2d');

    // 绘制背景
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(0, 0, 32, 32);

    // 绘制简单的图标
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(8, 8, 16, 16);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'favicon.png'), buffer);
}

// 生成og-image
function generateOgImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // 绘制背景
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(0, 0, 1200, 630);

    // 绘制标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Image Split Tool', 600, 300);

    // 绘制副标题
    ctx.font = '36px Arial';
    ctx.fillText('Create 9-Grid Social Media Images', 600, 380);

    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(outputDir, 'og-image.jpg'), buffer);
}

// 生成twitter-image
function generateTwitterImage() {
    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext('2d');

    // 绘制背景
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(0, 0, 1200, 600);

    // 绘制标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Image Split Tool', 600, 300);

    // 绘制副标题
    ctx.font = '36px Arial';
    ctx.fillText('Create 9-Grid Social Media Images', 600, 380);

    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(outputDir, 'twitter-image.jpg'), buffer);
}

// 生成apple-touch-icon
function generateAppleTouchIcon() {
    const canvas = createCanvas(180, 180);
    const ctx = canvas.getContext('2d');

    // 绘制背景
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(0, 0, 180, 180);

    // 绘制简单的图标
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(45, 45, 90, 90);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, 'apple-touch-icon.png'), buffer);
}

// 生成所有图片
generateFavicon();
generateOgImage();
generateTwitterImage();
generateAppleTouchIcon();

console.log('All images generated successfully!'); 