CSRF_ENABLED = True
#SECRET_KEY设置当CSRF启用时有效，这将生成一个加密的token供表单验证使用，你要确保这个KEY足够复杂不会被简单推测。
SECRET_KEY = 'watson-customer-management'
UPLOAD_FOLDER = '/app/app/static/resources/'