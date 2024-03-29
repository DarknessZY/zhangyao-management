import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import { svgBuilder } from './src/plugins/svgBuilder';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteImagemin from 'vite-plugin-imagemin'
const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    vue(),
    vueJsx(),
    [svgBuilder('./src/assets/icons/svg/')],// 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
    AutoImport
    ({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
    // 图片资源压缩
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  esbuild:{
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
  },
	resolve: {
		alias: {
			'@': resolve('src'),
		}
	},
  server: {
    //热更新是否开启
     hmr:true,
    // 配置前端服务地址和端口
     //服务器主机名
     host: '127.0.0.1',
     //端口号
     port: 3088,
     //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
     strictPort: false,
     //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
     open: false,
     //自定义代理规则
     proxy: {
       // 选项写法
       '/api': {
         target: 'http://zyao.yaoyaoqiekenao.com/api',//请求的服务器的地址
         changeOrigin: true,
         rewrite: path => path.replace(/^\/api/, '')
       }
     }
   }
})