module.exports = function(plop) {
  plop.setHelper('setName', function(text) {
    const array = text.split('/')
    const lastText = array[array.length - 1]
    const lastText2 = lastText.slice(0, 1).toUpperCase() + lastText.slice(1, lastText.length)
    array[array.length - 1] = lastText2
    return array.join('/')
  })

  plop.setHelper('getStyleName', function(text) {
    const array = text.split('/')
    const lastText = array[array.length - 1]
    return lastText.slice(0, 1).toUpperCase() + lastText.slice(1, lastText.length)
  })

  plop.setHelper('setPageName', function(text) {
    const array = text.split('/')
    let pageName = ''
    array.forEach(item => {
      pageName += item.slice(0, 1).toUpperCase() + item.slice(1, item.length)
    })
    return pageName
  })

  plop.setHelper('setCompomentPathName', function(text) {
    const array = text.split('/')
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].slice(0, 1).toUpperCase() + array[i].slice(1, array[i].length)
    }
    return array.join('/')
  })

  // 在这里创建你的生成器
  plop.setGenerator('page', {
    description: '生成简单初始页面',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入你要新建的文件(如：coumity/building/index)',
      },
    ], // 提示数组
    actions: [
      {
        type: 'add',
        path: '../src/views/{{setName name}}.vue',
        templateFile: './templates/page.hbs',
      },
      {
        type: 'add',
        path: '../src/views/{{setName name}}.scss',
        templateFile: '',
      },
    ], // 行为数组
  })

  plop.setGenerator('component', {
    description: '生成组件初始页面',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '请输入你要新建的组件(如：ImagePreview)',
      },
    ], // 提示数组
    actions: [
      {
        type: 'add',
        path: '../src/components/{{setCompomentPathName name}}/{{getStyleName name}}.vue',
        templateFile: './templates/component.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{setCompomentPathName name}}/{{getStyleName name}}.scss',
        templateFile: '',
      },
    ], // 行为数组
  })
}
