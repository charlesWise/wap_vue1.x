<template>
  <div class="main">
    <!-- 鑫拍档分享页 -->
    <div class="xinpd-banner">
      <img src="../../assets/images/activity/xinpartner/partner-share_02.png" alt="">
      <img src="../../assets/images/activity/xinpartner/partner-share_03.png" alt="">
      <img src="../../assets/images/activity/xinpartner/partner-share_04.png" alt="">
      <img src="../../assets/images/activity/xinpartner/partner-share_05.png" alt="">
      <img src="../../assets/images/activity/xinpartner/partner-share_06.png" alt="">
      <img src="../../assets/images/activity/xinpartner/partner-share_07.png" alt="">
    </div>
      <ul class="partner-share-data">
        <li>
          <p>累计投资用户</p>
          <p class="partner-s-data-txt"><em><?php echo $stats_info['allpeople'];?></em>万</p>
        </li>
        <li class="line">
          <p>累计成交额</p>
          <p class="partner-s-data-txt"><em><?php echo $stats_info['allaccount'];?></em>万</p>
        </li>
      </ul>
      <p class="partner-shar-point">30秒成为会员，领取尊享红包</p>
      <a href="#" id="laok" target="_blank" userurl="{:U('Account/User/registerSuccess')}" ></a>
      <form action="{:U('Weixin/Index/register')}" method="post" id="formId_Account_User_Register" novalidate>
        <ul class="partner-show-reg">
          <li class="name-pw-error"></li>
          <li><span class="span1 word1">手机号</span><span class="span2"><input type="text" name="mobile" _type="手机号" class="share-input" maxlength="11" required placeholder="请输入您的手机号码" onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
                                             onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" ></span></li>
          <li><span class="span1 word2">登录密码</span><span class="span2"><input type="password" name="pwd" _type="登录密码" class="share-input" required placeholder="6-16位字母、数字或符号"></span></li>
          <li><span class="span1 word1">验证码</span><span class="span2"><input type="text" name="authCode" _type="验证码" class="share-input" required placeholder=""></span>
            <a href="javascript:;" class="">
              <img data-src="{:U('Mobile/XinPartner/verifyCode',array('version'=>uniqid()))}" src="{:U('Mobile/XinPartner/verifyCode',array('version'=>uniqid()))}" class="VerifyCodeImg" width="69" height="39" />
            </a>
          </li>
          <li class="last"><span class="span1">手机动态码</span><span class="span2"><input type="text" name="code" _type="手机动态码" required class="share-input"></span><a href="javascript:;" class="partner-s-free show_send_btn">免费获取</a></li>
        </ul>

        <div class="share-li-last"><button type="submit" class="partner-submit">立即注册领取500元礼包</button>
        <div class="last-box">
          <span class="sp1">我已阅读并同意<a colorbox="1" href="javascript:void(0)" url="/Index/Protocol/view?id=1">《鑫合汇注册协议》</a></span><span class="sp2">已有账户？<a href="javascript:;">立即登录</a></span>
        </div>
      </div>
      </form>
        <div class="partner-content">
        <p class="partnerd-title">最大的专业短期理财平台</p>
        <p class="partner-txt-t">期限短&nbsp;&nbsp;&nbsp;&nbsp;更安全</p>
        <div class="partner-point-list"><span class="point1"><img src="../../assets/images/activity/xinpartner/partner-share_10.png" alt="">精选优质短期资产</span><span class="point2"><img src="../../assets/images/activity/xinpartner/partner-share_13.png" alt="">全场景监督风控</span></div>
        <div class="partner-point-list"><span class="point1"><img src="../../assets/images/activity/xinpartner/partner-share_17.png" alt="">浙商银行资金托管</span><span class="point2"><img src="../../assets/images/activity/xinpartner/partner-share_18.png" alt="">人保财险资金保障</span></div>
        <div class="partner-point-list point-list-last"><span class="point1"><img src="../../assets/images/activity/xinpartner/partner-share_22.png" alt="">100%安全兑付</span><span class="point2"><img src="../../assets/images/activity/xinpartner/partner-share_21.png" alt="">500万用户信赖之选</span></div>
        <p class="partnerd-title">收益稳定，远超同行</p>
        <div class="partner-data-show">
          <span class="data1"><img src="../../assets/images/activity/xinpartner/partner-share_32.png" class="img1" alt=""><br>银行活期年利率<br>0.35%</span>
          <span class="data2"><img src="../../assets/images/activity/xinpartner/partner-share_26.png" class="img2" alt=""><br>鑫合汇年化收益率<br><em>8.5%</em></span>
          <span class="data3"><img src="../../assets/images/activity/xinpartner/partner-share_29.png" class="img3" alt=""><br>宝宝类产品7日<br>年化收益率<br>2.67%</span>
        </div>
        <p class="partnerd-title">政府媒体，广泛认可</p>
        <div class="partner-media-box">
          <div class="media-list"><div class="media1"><img src="../../assets/images/activity/xinpartner/partner-share_38.png" alt=""></div><div class="media2">中国互联网金融最佳商业模式<br>——最佳平台价值奖</div></div>
          <div class="media-list"><div class="media1"><img src="../../assets/images/activity/xinpartner/partner-share_43.png" alt=""></div><div class="media2">金蝉奖<br>——最佳风控平台</div></div>
          <div class="media-list"><div class="media1"><img src="../../assets/images/activity/xinpartner/partner-share_45.png" alt=""></div><div class="media2">福布斯中国互联网金融50强</div></div>
          <p class="partner-mores">……</p>
        </div>
        <p class="partnerd-title">合作伙伴，共创共赢</p>
        <div class="partner-body-box">
          <div class="body1"><img src="../../assets/images/activity/xinpartner/partner-reg_25.png" alt=""><br><img src="../../assets/images/activity/xinpartner/partner-reg_27.png" alt=""></div>
          <div class="body2"><img src="../../assets/images/activity/xinpartner/partner-reg_31.png" alt=""><br><img src="../../assets/images/activity/xinpartner/partner-reg_32.jpg" alt=""></div>
        </div>
      </div>
      <div class="partner-footer">
        <p class="partner-phone"><img src="../../assets/images/activity/xinpartner/phone.png" alt="">全国客服热线：400-821-8616 </p>
        <p>周一至周五：09:00-21:00     双休/节假日：09:00-17:00<br>©2014-2016,xinhehui.com.  <br>浙ICP证 B2-20150262   浙ICP备14025828号 </p>
      </div>
    </div>
      

    <!-- 鑫拍档 -->
    <div class="xinpd-banner">
      <img src="../../assets/images/activity/xinpartner/banner_01.jpg" alt="" />
      <img src="../../assets/images/activity/xinpartner/banner_02.jpg" alt="" />
      <img src="../../assets/images/activity/xinpartner/banner_03.jpg" alt="" />
      <img src="../../assets/images/activity/xinpartner/banner_04.jpg" alt="" />
      <img src="../../assets/images/activity/xinpartner/banner_05.jpg" alt="" />
    </div>
    <section class="xinpartner-container">
      <div class="text">
        <p>鑫拍档是2016年针对尊贵会员推出的重磅福利计划！加入即可额外获得推荐好友的投资返佣金，每日计算，收益可观，财富立见！</p>
        <p>现在加入更有惊喜红包，送完即止！鑫拍档首期开放，仅限<span>2000席</span>，错过何止难过！</p>
      </div>
      <!-- 鑫拍档-未开启 -->
      <!-- <div class="bottom-part">
        <p>您的有效待收本金数额已符合申请条件</p>
        <div class="xinpartner-btn"><a href="javascript:;">成为鑫拍档</a></div>
        <div class="agree"><input type="checkbox" name="agree" value="agree" />阅读并同意《<span>自动转入服务协议</span>》</div>
      </div> -->
      <!-- 鑫拍档-开启 -->
      <div class="bottom-part">
        <p>您的有效待收本金数额尚不足10000元尽快投资吧，名额不多了！等你噢！</p>
        <div class="xinpartner-btn"><a href="javascript:;">立即投资</a></div>
      </div>
    </section>


    <!-- 鑫拍档规则 -->
    <div class="xinpd-banner">
      <img src="../../assets/images/activity/xinpartner/banner_rules_01.jpg" alt="">
      <img src="../../assets/images/activity/xinpartner/banner_rules_02.jpg" alt="">
      <img src="../../assets/images/activity/xinpartner/banner_rules_03.jpg" alt="">
      <img src="../../assets/images/activity/xinpartner/banner_rules_04.jpg" alt="">
      <img src="../../assets/images/activity/xinpartner/banner_rules_05.jpg" alt="">
    </div>
    <section class="xinpartner-container xinpartnerrules-container">
      <ul>
        <li class="lipadding0">
          <h3>佣金计算规则：</h3>
          <p><span>●</span>鑫拍档用户佣金 = 一级佣金+二级佣金</p>
          <p><span>●</span>一级佣金 = 一级好友投资本金*一级佣金率 / 365</p>
          <p><span>●</span>二级佣金 = 二级好友投资本金*二级佣金率 / 365</p>
          <h3>好友分级：</h3>
          <p><span>●</span>一级好友：由鑫拍档用户直接推荐成功投资的用户。</p>
          <p><span>●</span>二级好友：由一级好友推荐成功投资的用户。</p>
          <p><img src="../../assets/images/activity/xinpartner/brokerage.jpg" alt=""></p>
        </li>
        <li>
          <h3>好友投资本金：</h3>
          <p><span>●</span>好友成功投资的总金额（不含已变现部分），可在好友的“我的账户”-“我的投资”页面查看。</p>
        </li>
        <li class="rate">
          <h3>佣金率：</h3>
          <table>
                      <tr><td>佣金等级</td><td>好友投资本金</td><td>佣金率</td></tr>
                      <tr><td rowspan="2">一级佣金率</td><td>0＜一级好友投资本金＜100万</td><td>0.5%</td></tr>
                      <tr><td>一级好友投资本金≥100万</td><td>0.6%</td></tr>
                      <tr><td>二级佣金率</td><td>二级好友投资本金＞0</td><td>0.1%</td></tr>
                  </table>
        </li>
        <li>
          <h3>佣金结算规则：</h3>
          <p>1.佣金奖励仅针对成为“鑫拍档用户”之后推荐产生的好友投资，在此之前邀请的好友投资不纳入佣金结算范围。</p>
          <p>2.鑫拍档用户本人投资本金不得低于1万元。低于1万元时系统将会自动暂停佣金结算直至投资本金满足条件后自动恢复。</p>
          <p>3.每日0点，系统会根据佣金计算规则，对佣金进行结算。鑫拍档用户可进入“鑫拍档”页面查看昨日佣金、当月佣金、累计佣金、邀请好友明细等。</p>
          <p>4.单日佣金不足0.01元时，不计入佣金账户。</p>
        </li>
        <li>
          <h3>佣金结算规则：</h3>
          <p>1.每月1日，系统会自动将上月佣金从鑫拍档佣金账户转入“可用余额”。</p>
          <p>2.当月佣金不足1元时，佣金暂不转入，自动累积至下月。</p>
        </li>
        <li class="apple">
          <h3>说明：</h3>
          <p><span>●</span>鑫拍档规则的最终解释权归属鑫合汇所有。</p>
        </li>
      </ul>
      <!-- <ul class="rule_description">
        <li>
          <h3>说明：</h3>
          <p>1.佣金在被邀请用户投资起息后开始计算，被邀请用户投资项目的募集期不计算佣金。</p>
          <p>2.佣金每日结算，每日0点结算前一天佣金，自动充入用户的佣金账户。</p>
          <p>3.用户个人当前投资本金＜10000元时，不再获得当天佣金。</p>
          <p>4.每日佣金低于1分的不予计入佣金账户，每月可提取佣金低于1元不能划拨到账户可用余额。</p>
          <p>5.系统在每月1日自动将上月佣金转入账户可用余额。</p>
          <p>6.成为鑫拍档后邀请的用户开始计算佣金，成为鑫拍档之前邀请的用户不纳入佣金计算范围。</p>
          <p>7.此活动与苹果公司无关，最终解释权归鑫合汇所有。</p>
        </li>
      </ul> -->




    </section>
  </div>
</template>
<style lang="sass">
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
