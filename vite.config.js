import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';
import fs from 'fs';
import path from 'path';

function collectModuleAssetsPaths(basePath, moduleDir) {
    const modulesPath = path.resolve(basePath, moduleDir);
    
    if (!fs.existsSync(modulesPath)) {
        return [];
    }

    const moduleFolders = fs.readdirSync(modulesPath);
    
    return moduleFolders.flatMap(folder => {
        const jsPath = path.resolve(modulesPath, folder, 'resources/js/app.js');
        const cssPath = path.resolve(modulesPath, folder, 'resources/css/app.css');
        
        return [
            fs.existsSync(jsPath) ? jsPath : null,
            fs.existsSync(cssPath) ? cssPath : null
        ].filter(Boolean); // Filtra los valores null en caso de que no existan archivos
    });
}

// Directorio base de resources
const resourcesPath = fileURLToPath(new URL('./resources', import.meta.url));

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                ...collectModuleAssetsPaths(resourcesPath, '../Modules')
            ],
            refresh: true,
        }),
        tailwindcss({
            optimize: false, // Mantiene DaisyUI sin pasar por Lightning CSS para evitar warnings de @property
        }), // Se agrega el plugin de Tailwind CSS 4 para Vite
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});