# 使用 Node.js 18 作为基础镜像
FROM node:18

# 将当前工作目录设置为/app/user-center
WORKDIR /app/user-center


# # 安装 git
# RUN yum install -y git

# # 获取前端源代码到当前目录
# RUN git clone --no-checkout https://github.com/silengzi/yupi-user-center.git
# # 进入到项目根目录
# RUN cd yupi-user-center
# # 开启稀疏检出模式
# RUN git sparse-checkout init --cone
# # 设置要稀疏检出的目录
# RUN git sparse-checkout user-center-web
# # 检出文件
# RUN git checkout main
# # 回到项目根目录
# RUN cd ..
# # 移动 user-center-web 下面的所有文件到 Docker 的工作目录下
# RUN mv yupi-user-center/user-center-web/* ./
# # 删除 yupi-user-center 目录
# RUN rm -rf yupi-user-center


# 将 package.json 和 package-lock.json 复制到 /app/user-center 目录下
COPY package*.json ./

# 运行 npm install 安装依赖
RUN npm install

# 将源代码复制到 /app/user-center 目录下
COPY . .

# 打包构建
RUN npm run build

# 将构建后的代码复制到 nginx 镜像中
FROM nginx:latest
COPY ./dist /usr/share/nginx/html

# 暴露容器的 8080 端口，此处其实只是一个声明作用，不写的话也可以，后面运行容器的
# docker run --name container_name -p <host_port>:<container_port>命令中container_port可以覆盖此处的声明，不写就默认80端口
# EXPOSE 8080

# 启动 nginx 服务
CMD ["nginx", "-g", "daemon off;"]
