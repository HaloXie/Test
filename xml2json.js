var parser = require('xml2json');

const xmlContent = `<?xml version='1.1' encoding='UTF-8'?>
<project>
    <actions/>
    <description></description>
    <keepDependencies>false</keepDependencies>
    <properties/>
    <scm class="hudson.scm.NullSCM"/>
    <canRoam>true</canRoam>
    <disabled>true</disabled>
    <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
    <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
    <triggers/>
    <concurrentBuild>false</concurrentBuild>
    <builders>
        <hudson.tasks.Shell>
            <command># !/bin/sh -l
export export PATH=/Users/ezt.xieminghao/.nvm/versions/node/v16.4.0/bin/:$PATH

# 变量定义
conNameBuild=&apos;7221-guucube-sys-build&apos; # build容器名
fSourcePath=&apos;/var/local/gitsource/frontend/advokate-guucube-manage-element&apos; # 前端源代码
runPath=&apos;/var/local/workspace_pages/7221-advokate-guucube-manage-element/web&apos; # 发布目录

# 停止并删除build容器（可选）
# docker container stop $conNameBuild
# docker container rm $conNameBuild

# 获取代码
cd $fSourcePath
git checkout .
git checkout dev &amp;&amp; git branch
git pull

# 启动build容器
docker run -itd --name $conNameBuild \
  --mount type=bind,source=$fSourcePath,destination=/app/fSourcePath \
  lxsbw/centos7.6-node:node12.18.3-build-a
# 调用build容器对前端代码进行install、build
docker exec $conNameBuild /bin/bash -c &apos;cd /app/fSourcePath &amp;&amp; yarn install &amp;&amp; yarn build&apos;

# 删除发布目录，再移动新编译的文件到发布目录
rm -rf $runPath
mv -v $fSourcePath/dist/public $runPath

</command>
            <configuredLocalRules/>
        </hudson.tasks.Shell>
    </builders>
    <publishers/>
    <buildWrappers/>
</project>`;

const jsonContent = parser.toJson(xmlContent, { reversible: true });
// console.log(jsonContent);
// console.log(JSON.parse(jsonContent));

const xml = parser.toXml(jsonContent);
console.log(xml);
