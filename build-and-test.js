// 构建并测试生产环境
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// 构建项目
async function buildProject() {
  console.log('开始构建项目...');
  try {
    const { stdout, stderr } = await execAsync('npm run build');
    console.log('构建输出:', stdout);
    if (stderr) console.error('构建错误:', stderr);
    console.log('项目构建完成！');
    return true;
  } catch (error) {
    console.error('构建失败:', error);
    return false;
  }
}

// 启动预览服务器
async function startPreviewServer() {
  console.log('启动预览服务器...');
  try {
    const previewProcess = exec('npm run preview');
    
    previewProcess.stdout.on('data', (data) => {
      console.log(`预览服务器输出: ${data}`);
    });
    
    previewProcess.stderr.on('data', (data) => {
      console.error(`预览服务器错误: ${data}`);
    });
    
    console.log('预览服务器已启动，请在浏览器中访问显示的URL进行测试');
    console.log('测试完成后，按Ctrl+C终止此脚本');
    
    // 保持进程运行
    previewProcess.on('close', (code) => {
      console.log(`预览服务器已关闭，退出码: ${code}`);
    });
  } catch (error) {
    console.error('启动预览服务器失败:', error);
  }
}

// 主函数
async function main() {
  const buildSuccess = await buildProject();
  if (buildSuccess) {
    await startPreviewServer();
  }
}

main().catch(console.error);
