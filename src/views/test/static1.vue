<template>
  <div class="main">
    <section class="person-setting">
      <!-- 手势密码 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>手势密码</h1></aside>
      <section class="set-items">
        <ul>
          <li class="del-border"><a href="javascript:;">手势密码开关<span class="switch"><input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value"/></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">手势密码修改<span class="not-set">></span></a></li>
        </ul>
      </section>
      <div class="mask dn"></div>
      <div class="popup-box dn">
        <h1>请输入登录密码</h1>
        <div class="login-pwd">
          <input type="text" />
          <p><a href="javascript:" class="add-border">取消</a><a class="blue" href="javascript:">确定</a></p>
        </div>
      </div>

      <!-- 设置 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>设置</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">登录密码<span class="not-set">未设置 <i class="arrow-r"></i></span></span></a></li>
          <li><a href="javascript:;">支付密码<span>已设置 <i class="arrow-r"></i></span></span></a></li>
          <li><a href="javascript:;">手势密码<span>已设置 <i class="arrow-r"></i></span></span></a></li>
          <li><a href="javascript:;">安全保护问题<span>已设置 <i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li class="del-border"><a href="javascript:;">消息通知<span class="switch"><input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value"/></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li class="del-border"><a href="javascript:;" class="big-font">使用支付密码充值<span class="switch"><input class="weui_switch" type="checkbox" :disabled="disabled" v-model="value"/></span></a></li>
        </ul>
      </section>

      <!-- 登录密码修改 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>登录密码修改<span class="forget-pwd">忘记密码</span></h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width">当前密码</label><input class="input-width" type="password" placeholder="输入当前密码"><a href="javascript:;"><span class="clean">x</span></a></li>
            <li><label class="label-width">新密码</label><input class="input-width" type="password" placeholder="确认密码"><a href="javascript:;"><span class="clean">x</span></a></li>
            <li><label class="label-width">确认密码</label><input class="input-width" type="password" placeholder="再次填写确认"><a href="javascript:;"><span class="clean">x</span></a></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" /></div>
          <div class="tips">密码修改成功</div>
        </form>
      </section>

      <!-- 用户中心 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>用户中心</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;"><em class="user-photo"></em>账户信息<span>></span></a></li>
          <li><a href="javascript:;"><em class="icon-code"></em>我的二维码<span>></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;"><em class="icon-set"></em>设置<span>></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li class="log-out"><a href="javascript:;">退出登录</a></li>
        </ul>
      </section>

      <!-- 手机支付密码设置 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>手机支付密码设置</h1></aside>
      <section class="pay-pwd">
        <p>请输入六位数字手机支付密码</p>
        <form action="">
          <div class="small-pwd">
            <input type="password" /><input type="password" /><input type="password" />
            <input type="password" /><input type="password" /><input class="del-border" type="password" />
            <input type="hidden" type="password" />
          </div>
          <div class="submit-button"><input class="blue" type="button" value="确定" /></div>
        </form>
      </section>

      <section class="pay-pwd">
        <p>确认支付密码</p>
        <form action="">
          <div class="small-pwd">
            <input type="password" /><input type="password" /><input type="password" />
            <input type="password" /><input type="password" /><input class="del-border" type="password" />
            <input type="hidden" type="password" />
          </div>
          <div class="submit-button"><input class="half reset-btn" type="button" value="重新设置" /><input class="half blue" type="button" value="确定" /></div>
        </form>
        <div class="tips">支付密码设置成功</div>
      </section>

      <!-- 支付密码 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>手势密码</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">修改支付密码<span class="not-set">></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">通过安全问题找回<span class="not-set">></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">通过动态码+已绑定银行卡找回<span class="not-set">></span></a></li>
        </ul>
      </section>

      <!-- 修改支付密码 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>登录密码修改</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width cur-pwd">当前支付密码</label><input class="input-width cur-input" type="password" placeholder="当前支付密码"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" /></div>
        </form>
        <div class="tips">原支付密码有误</div>
      </section>

      <!-- 支付密码找回 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>登录密码修改</h1></aside>
      <section class="set-items">
        <div class="verify"><p>请回答安全保护问题来校验身份</p><p class="big">安保问题：您的中学名称？</p></div>
        <form action="">
          <ul>
            <li><label class="label-width cur-pwd">问题答案</label><input class="input-width cur-input" type="password" placeholder="问题答案"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" /></div>
        </form>
      </section>

      <!-- 安全保护问题设置 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>安全保护问题设置</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width cur-pwd">支付密码</label><input class="input-width cur-input" type="password" placeholder="支付密码"></li>
            <li><a href="javascript:;">选择安保问题<span>></span></a></li>
            <li><label class="label-width cur-pwd">问题答案</label><input class="input-width cur-input" type="password" placeholder="问题答案"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" /></div>
        </form>
      </section>

      <!-- 支付密码找回 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>支付密码找回</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><a href="javascript:;">选择要验证的银行卡<span>></span></a></li>
            <li><label class="label-width">银行卡卡号</label><input class="input-width" type="password" placeholder="银行卡卡号"></li>
            <li><label class="label-width code-width">手机动态码</label><input class="input-width dynamic-code" type="password" placeholder="手机动态码"><span><a class="get-code" href="javascript:;">点击获取</a></span></li>
          </ul>
          <div class="submit-button"><input type="button" value="下一步" /></div>
        </form>
      </section>
      <div class="mask dn"></div>
      <div class="popup-bottom dn">
        <h3><span class="icon-close"></span>选择要验证的银行卡</h3>
        <ul>
          <li><p>中国银行储蓄卡（8608）</p></li>
          <li><p>中国农业银行储蓄卡（8608）</p></li>
          <li><p>中国银行储蓄卡（8608）</p></li>
        </ul>
      </div>

      <!-- 问题选择 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>问题选择</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">你的小学名称<span class="select-character"></span></a></li>
          <li><a href="javascript:;">你的小学名称<span class="select-character"></span></a></li>
          <li><a href="javascript:;">你的小学名称<span></span></a></li>
        </ul>
      </section>


      <!-- 安全保护问题修改 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>安全保护问题修改</h1></aside>
      <section class="set-items">
        <div class="verify"><p class="big">安保问题：您的中学名称？</p></div>
        <form action="">
          <ul>
            <li><label class="label-width cur-pwd">问题答案</label><input class="input-width cur-input" type="password" placeholder="问题答案"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" /></div>
        </form>
        <div class="tips">答案有误</div>
      </section>

      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>安全保护问题修改</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><a href="javascript:;">选择安保问题<span>></span></a></li>
            <li><label class="label-width cur-pwd">问题答案</label><input class="input-width cur-input" type="password" placeholder="问题答案"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" /></div>
        </form>
      </section>

      <!-- 邮箱绑定 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>邮箱绑定</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width">邮箱</label><input class="input-width" type="password" placeholder="123****1118@qq.com"><a href="javascript:;"><span class="clean">x</span></a></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" /></div>
          <div class="tips add-height">认证邮件已发送，<br />请前往邮箱激活链接 ！</div>
        </form>
      </section>

      <!-- 当前手机认证 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>当前手机认证</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width">手机号</label><input class="input-width" type="password" placeholder="手机号"></li>
            <li><label class="label-width code-width">动态码</label><input class="input-width dynamic-code" type="password" placeholder="动态码"><span><a class="get-code" href="javascript:;">点击获取</a></span></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" /></div>
        </form>
      </section>

      <!-- 绑定新手机 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>绑定新手机</h1></aside>
      <section class="set-items">
        <div class="verify"><p>请输入你需要绑定的新手机号</p></div>
        <form action="">
          <ul>
            <li><label class="label-width">手机号</label><input class="input-width" type="password" placeholder="手机号"></li>
            <li><label class="label-width">动态码</label><input class="input-width dynamic-code" type="password" placeholder="动态码"><span><a class="get-code" href="javascript:;">点击获取</a></span></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" /></div>
        </form>
      </section>

      <!-- 绑定新手机 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>当前手机号</h1></aside>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width">手机号</label><input class="input-width" type="password" placeholder="手机号"></li>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="更换手机号" /></div>
          <div class="verify"><p>温馨提示：若您当前手机号码已停止使用，可以发送邮件至 helpdesk@xinhehui.com 申请更换手机号码，请您在邮件中提供：姓名、手机号、本人手持身份证正反面照片，客服会在24小时内处理，或拨打客服电话 <em>400-821-8616</em></p></div>
        </form>
      </section>

      <!-- 用户名设置 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>用户名设置</h1></aside>
      <section class="set-items">
        <form action="">
          <div class="verify"><p>*用户名只可设置一次，请输入你熟悉的用户名</p></div>
          <ul>
            <li><label class="label-width">用户名</label><input class="input-width" type="password" placeholder="输入用户名"><a href="javascript:;"><span class="clean">x</span></a></li>
          </ul>
        </form>
      </section>

      <!-- 个人信息 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>个人信息</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">头像<span class="not-set person-image"><img src="../../assets/images/account/portrait.png" alt="" /> ></span></a></li>
          <li><a href="javascript:;">用户名<span class="not-set">偶买噶  <i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">手机认证<span class="not-set">187****5006 <i class="arrow-r"></i></span></span></a></li>
          <li><a href="javascript:;">邮箱认证<span class="not-set">18767*****@163.com <i class="arrow-r"></i></span></span></a></li>
          <li><a href="javascript:;">实名认证<span class="not-set">*地瓜 <i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>

      <!-- 头像设置 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>头像设置</h1></aside>
      <section class="photo-setting">
        <div><img src="../../assets/images/account/portrait.png" alt="" /></div>
      </section>
      <section class="set-items">
        <ul>
          <li class="choose-album"><a href="javascript:;">从相册选一张</a></li>
        </ul>
      </section>

      <!-- 更多 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>更多</h1></aside>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">鑫吧客<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">常见问题<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">资讯中心<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">关于鑫合汇<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
        </ul>
      </section>
      <section class="set-items">
        <ul>
          <li><a href="javascript:;">关于<span>V6.0.0</span></a></li>
        </ul>
      </section>
      <section class="monitor-footer">
        <h3>400-821-8616</h3>
        <p>周一至周五 09:00-21:00</p><p>双休\节假日 09:00-17:00</p>
        <h1>监督举报<p class="two-sides-line"><img src="../../assets/images/account/two-sides-line.png" alt="" /></p></h1>
      </section>

      <!-- 活动专区 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>个人信息</h1></aside>
      <section class="activity-items">
        <ul>
          <li>
            <dl>
              <dt><span>即将开启</span><time>2015-03-05止</time></dt>
              <dd>
                <span class="column-figure"><img src="../../assets/images/activity/column-figure.jpg" alt="" /></span></span><span class="column-text"><h3>猴年抱枕大放送</h3><p>五一黄金周来临之际,各商家纷纷推出打折优惠活动吸引顾客眼球。然而,记者走访发现一家不一样的家...</p></span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span class="red-bj">火热进行</span><time>2015-03-05止</time></dt>
              <dd>
                <span class="column-figure"><img src="../../assets/images/activity/column-figure.jpg" alt="" /></span></span><span class="column-text"><h3>猴年抱枕大放送</h3><p>五一黄金周来临之际,各商家纷纷推出打折优惠活动吸引顾客眼球。然而,记者走访发现一家不一样的家...</p></span>
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt><span>即将开启</span><time>2015-03-05止</time></dt>
              <dd>
                <span class="column-figure"><img src="../../assets/images/activity/column-figure.jpg" alt="" /></span></span><span class="column-text"><h3>猴年抱枕大放送</h3><p>五一黄金周来临之际,各商家纷纷推出打折优惠活动吸引顾客眼球。然而,记者走访发现一家不一样的家...</p></span>
              </dd>
            </dl>
          </li>
        </ul>
      </section>

      <!-- 资讯中心 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>资讯中心</h1></aside>
      <section class="news-tab">
        <ul>
          <li :class="{active: order}">平面公告</li>
          <li>最新动态</li>
          <li>媒体报道</li>
        </ul>
      </section>
      <section class="news-list">
        <ul>
          <li><h3>忘记登录密码后该怎么办？</h3><time>2016-03-14</time><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容....</p></li>
          <li><h3>忘记登录密码后该怎么办？</h3><time>2016-03-14</time><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容....</p></li>
        </ul>
      </section>


      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>资讯中心</h1></aside>
      <section class="news-tab">
        <ul>
          <li>平面公告</li>
          <li  :class="{active: order}">最新动态</li>
          <li>媒体报道</li>
        </ul>
      </section>
      <section class="news-lists">
        <ul>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><time>2016-03-14</time><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p></dd></dl></li>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><time>2016-03-14</time><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p></dd></dl></li>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><time>2016-03-14</time><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p></dd></dl></li>
        </ul>
      </section>

      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>资讯中心</h1></aside>
      <section class="news-tab">
        <ul>
          <li>平面公告</li>
          <li>最新动态</li>
          <li :class="{active: order}">媒体报道</li>
        </ul>
      </section>
      <section class="media-list">
        <ul>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><p><span>怎么办码后该怎么办</span><time>2016-03-14</time></p></dd></dl></li>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><p><span>怎么办码后该怎么办</span><time>2016-03-14</time></p></dd></dl></li>
          <li><dl><dt><img src="../../assets/images/activity/column-figure.jpg" alt="" /></dt><dd><h3>忘记登录密码后该怎么办码后该怎么办？</h3><p><span>怎么办码后该怎么办</span><time>2016-03-14</time></p></dd></dl></li>
        </ul>
      </section>

      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>动态详情</h1></aside>
      <div class="articles-content"><h2>忘记登录密码后该怎么办？</h2><p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p></div>
      <div class="article-pages">
        <span class="prev">上一遍</span><span class="next">下一遍</span>
      </div>

      <!-- 常见问题 -->
      <aside class="top-title"><a href="javascript:;" class="icon-goback"></a><h1>常见问题</h1></aside>
      <section class="problem-tab">
        <div class="tab-scroll">
          <ul>
            <li :class="{active: order}">注册/登录</li>
            <li>充值/提现</li>
            <li>投资/回款</li>
            <li>变现</li>
            <li>自动投标</li>
          </ul>
        </div>
      </section>
      <section class="problem-lists">
        <ul>
          <li><dl><dt>如何注册？</dt><dd><span class="icon-turnoff"></span></dd></dl></li>
          <li><dl><dt>忘记登录密码后应该怎么办？</dt><dd><span class="icon-turnon"></span></dd></dl>
            <div class="solve">答：忘记登录密码忘记登录密码忘记登录密码忘记登录密码忘记登录密码忘记登录密码忘记登录密码</div>
          </li>
        </ul>
      </section>



      

      <div style="margin-bottom: 7rem;"></div>
    </section>
</template>
<style lang="sass">
  .weui_switch:before{
    background-color: #ddd;
  }
  .weui_switch:checked{
    border-color: #158fd0;
    background-color: #10a0eb;
  }
</style>
<script>
  import Api from '../../services/api'
  import { functions, alert as Alert } from '../../utils/functions'

  export default{
    data () {
      return {
        order: true
      }
    },
    created () {
      functions.setHeader(this.title)
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {
    },
    methods: {

    }
  }
</script>
