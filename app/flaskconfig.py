CSRF_ENABLED = True
#SECRET_KEY设置当CSRF启用时有效，这将生成一个加密的token供表单验证使用，你要确保这个KEY足够复杂不会被简单推测。
SECRET_KEY = 'watson-customer-management'
UPLOAD_FOLDER = '/Users/wzy/Documents/PycharmProjects/WatsonRobot/app/static/resource'
MAX_CONTENT_LENGTH = 4 * 1024 * 1024  # 4MB
#ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'csv', 'png', 'jpg', 'jpeg', 'gif'])
WTASON_ROBOT_VISUAL_COLLECTION = 'WTASON_ROBOT_VISUAL'