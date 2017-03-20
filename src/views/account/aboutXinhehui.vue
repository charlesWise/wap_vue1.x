<template>
  <div>
    <title-bar title="关于鑫合汇"></title-bar>
    <section class="news-tab">
      <ul>
        <li :class="{'active': prjtype===1}" @click="changeNav(1)">简介</li>
        <li :class="{'active': prjtype===2}" @click="changeNav(2)">优势</li>
        <li :class="{'active': prjtype===3}" @click="changeNav(3)">价值</li>
      </ul>
    </section>
    <section  class="media-list">
      <ul>
        <li v-if="prjtype===1">
          <summary class="summary newsummary" id="p1" data-scroll="1">
            <p>鑫合汇（xinhehui.com ）是目前中国规模最大的<b style="font-weight: bold;">专业短期理财平台</b>。依托母公司中新力合集团10年企业金融服务经验，基于对过桥金融业务的深度了解，鑫合汇拥有领先行业的过桥金融标准化产品设计能力，全场景监督风控能力以及互联网化营销能力，实现了优质过桥资产的规模化生产，为广大投资人提供短期，安全，灵活的理财产品，实现财富增值。</p>
            <p>鑫合汇自上线以来，总交易额已经突破350亿元，日交易额长期保持同业3强，累积用户超过500万人。2015年鑫合汇更获评“中国互联网金融最佳商业模式——最佳平台价值”奖、“金蝉奖——最佳风控平台”、以及“福布斯中国互联网金融50强”、“网贷之家互联网金融全国10强”等殊荣。2016年，鑫合汇成功入选成为中国互联网金融协会首批会员单位。</p>
          </summary>
        </li>
      </ul>
      <ul>
        <li v-if="prjtype===2">
          <div class="summary2">
            <h2 class="ui-borh2" id="p2" data-scroll="1">鑫合汇的优势</h2>
            <div class="superiority" style="overflow: hidden">
              <!-- <div class="hfhg_ysmodTab clboth">
                  <ul id="tabNav">
                    <li class="cur tabLi01 tabLi01h">
                      <a href="#tab1">
                        <div class="YSbzTUQ tacr">
                          <em class="YSbzTU YSbzZc"></em>
                        </div>
                        <p class="tacr">政策保障</p>
                        <em class="anamateArr"></em>
                      </a>
                    </li>
                    <li class="tabLi02">
                      <a href="#tab2">
                        <div class="YSbzTUQ tacr">
                          <em class="YSbzTU YSbzZc"></em>
                        </div>
                        <p class="tacr">风险控制</p>
                        <em class="anamateArr"></em>
                      </a>
                    </li>
                    <li class="tabLi03">
                      <a href="#tab3">
                        <div class="YSbzTUQ tacr">
                          <em class="YSbzTU YSbzZc"></em>
                        </div>
                        <p class="tacr">渠道保障</p>
                        <em class="anamateArr"></em>
                      </a>
                    </li>
                    <li class="tabLi04">
                      <a href="#tab4">
                        <div class="YSbzTUQ tacr">
                          <em class="YSbzTU YSbzZc"></em>
                        </div>
                        <p class="tacr">价值保障</p>
                        <em class="anamateArr"></em>
                      </a>
                    </li>
                    <li class="tabLi05">
                      <a href="#tab5">
                        <div class="YSbzTUQ tacr">
                          <em class="YSbzTU YSbzZc"></em>
                        </div>
                        <p class="tacr">技术保障</p>
                        <em class="anamateArr"></em>
                      </a>
                    </li>
                  </ul>
              </div> -->
              <div class="bd" id="tab-content">
                <div class="tab-content tab-content1" id="tab1" style="display: block">
                  <div class="advantageCn advantageCn1">
                    <h3 class="advantageCh3">一、借款人和出借人借贷关系的合法性</h3>
                    <p>我国法律承认公民之间、公民与法人之间、公民与其他组织间的借贷。</p>

                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc01.png"></div>
                    <h3 class="advantageCh3">二、借款人通过鑫合汇平台获得的出借收益的合法性</h3>
                    <p>我国法律允许出借人到期收回本金并取得法律规定的利息。出借人与借款人之间的借贷关系受到法律保护，在借款人违约时，应支付逾期罚息。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc02.png"></div>
                    <h3 class="advantageCh3">三、平台居间撮合服务的合法性</h3>
                    <p>鑫合汇平台是合法设立的中介服务机构，为借贷双方提供信息撮合服务，并根据法律规定有权收取相关报酬，是“普惠金融”的强有力的体现。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc03.png"></div>
                    <h3 class="advantageCh3">四、电子合同的合法性</h3>
                    <p>电子合同是法律认可的书面合同形式之一。鑫合汇采取用户网上点击确认的方式签署电子合同，其有效性被人民法院的司法实践所接受。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc04.png"></div>
                    <h3 class="advantageCh3">五、担保的合法性</h3>
                    <p>当借款人不能按时还本付息时，保证人将按照合同约定承担保证责任。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc05.png"></div>
                    <h3 class="advantageCh3">六、保理产品前端</h3>
                    <p>鑫合汇平台提供的商业保理业务属于合法范畴。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc06.png"></div>
                    <h3 class="advantageCh3">七、理财产品前端</h3>
                    <p>政府对民间融资组织给予重视和政策支持，将极大推进民间融资的合法化和平台发展。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Zc07.png"></div>
                  </div>
                </div>
                <div class="tab-content tab-content2" id="tab2" style="display: block">
                  <div class="advantageCn advantageCn2">
                    <h3 class="advantageCh3">核心风控</h3>
                    <p>通过中新力合集团的云融资数据平台及中小企业表达体系，进行行业分析、企业环境、企业信用调查、数据分析，结合中小企业特点，严格的证据与佐证材料体系，企业法人本身、企业人才多方面全面反映，通过建立，严格评判项目质量等级，对项目进行价值和风险判断。所有数据的采集、分析与判断均实现移动化、云端存储。</p>
                    <div class="advantageImg"><img src="../../assets/images/navice/Ysdb_Fk01.png"></div>
                    <h3 class="advantageCh3">信息披露</h3>
                    <p>鑫合汇平台为确保对投资人合法利益的保障，将信息披露制度化，合法规范的进行信息披露，将为平台用户传递完整、准确、及时的交易信息，实现各方方进行交易判断所需要的信息对称，控制交易风险。<br>向投资者披露项目推荐机构资质、评级等信息、原是借款人的基本信息、借款用途、期限、是否有抵押担保，采取何种还款方式以及增信措施等，并就该借款人的还款情况作出风险提示。向各级相关政府及监管者披露，平台的运作模式、平台的经营状况、资金托管状况，以及管理团队构成等。</p>
                    <div class="advantageImg advantageImg_d1"><img src="../../assets/images/navice/Ysdb_Fk02.png"></div>
                    <h3 class="advantageCh3">组织保障</h3>
                    <p>鑫合汇平台为确保合作机构提供给投资者的项目低风险，高收益，将从组织架构上系统的、科学的为投资者进行项目刷选和风险保障，特设立独立的董事会、风险委员会、大资管委员会、法律合规部、资产保全部等各种金融专业部门，为项目风险整体把控，并在需要时代表投资者进行权益维护与法律保障。</p>
                    <div class="advantageImg advantageImg_d2"><img src="../../assets/images/navice/Ysdb_Fk03.png"></div>
                    <h3 class="advantageCh3">机构准入</h3>
                    <p>鑫合汇实行机构准入策略，担保机构限定在全国担保机构会长、副会长及理事单位，各省级国资背景的会上及副会长单位。</p>
                    <div class="advantageImg advantageImg_d3"><img src="../../assets/images/navice/Ysdb_Fk04.png"></div>
                    <h3 class="advantageCh3">项目准入</h3>
                    <p class="rempadb">鑫合汇平台的项目有严格的准入标准：</p>
                    <p class="rempadtb"><span class="rightDotAc"><i class="doubleRoddot"></i>单个项目不超过担保公司净资产10%</span></p>
                    <p class="rempadtb"><span class="rightDotAc"><i class="doubleRoddot"></i>单个项目的借款/债权转让总额不超过1000万</span></p>
                    <p class="rempadtb"><span class="rightDotAc"><i class="doubleRoddot"></i>准入行业：高科技、环保、农业、医疗、教育等行业；</span></p>
                    <p class="rempadt"><span class="rightDotAc"><i class="doubleRoddot"></i>限制行业：房地产、低端制造业、严重污染等国家不支持行业。</span></p>
                    <div class="advantageImg advantageImg_d4"><img src="../../assets/images/navice/Ysdb_Fk05.png"></div>
                  </div>
                </div>
                <div class="tab-content tab-content3" id="tab3" style="display: block">
                  <div class="advantageCh3_ts clboth">
                      <p class="ts_title tacr rempadb">项目渠道供应充足</p>
                      <p class="ts_alt rempadt">鑫合汇平台的项目合作机构，均具备雄厚的运作实力及巨大的项目体量，确保平台项目供应充足、丰富、多样。</p>
                  </div>
                  <div class="advantageCn advantageCn3">
                    <h3 class="advantageCh3">合作范围</h3>
                    <p class="rempadb">鑫合汇合作渠道种类多样，覆盖：</p>
                    <div class="newQD_div clboth">
                      <ul class="newQD_ul clboth">
                        <li><i class="doubleRoddot"></i>全国性担保公司</li>
                        <li><i class="doubleRoddot"></i>小额贷款公司</li>
                        <li><i class="doubleRoddot"></i>融资租赁公司</li>
                        <li><i class="doubleRoddot"></i>金融机构</li>
                        <li><i class="doubleRoddot"></i>交易所</li>
                        <li><i class="doubleRoddot"></i>区域股交中心</li>
                      </ul>
                    </div>
                    <div class="advantageImg advantageImg_d5"><img src="../../assets/images/navice/Ysdb_Qd01.png"></div>
                    <h3 class="advantageCh3">合作项目</h3>
                    <p>鑫合汇合作项目类型丰富且期限多样，涵盖超短期、短期、中长期、长期项目。</p>
                    <div class="advantageImg advantageImg_d6"><img src="../../assets/images/navice/Ysdb_Qd02.png"></div>
                  </div>
                </div>
                <div class="tab-content tab-content4" id="tab4" style="display: block">
                  <div class="advantageCh3_ts clboth">
                      <p class="ts_title tacr rempadb">高收益产品发行体系</p>
                      <p class="ts_alt rempadt tacr">鑫合汇旨在打造用户最为安心、高收益的投资平台。</p>
                  </div>
                  <div class="advantageCn advantageCn4">
                    <h3 class="advantageCh3">高收益</h3>
                    <p class="rempadb">收益普遍在年化10%左右，是银行活期存款收益的28倍以上，是货币基金收益的2倍以上。</p>
                    <div class="advantageImg advantageImg_d1"><img src="../../assets/images/navice/Ysdb_Jz01.png"></div>
                    <h3 class="advantageCh3">低门槛</h3>
                    <p>投资门槛起步低， 50元即可起投。</p>
                    <div class="advantageImg advantageImg_d7"><img src="../../assets/images/navice/Ysdb_Jz02.png"></div>
                    <h3 class="advantageCh3">高流动性</h3>
                    <p>投资者认购的中长期理财产品，持有30天后即可随时变现。</p>
                    <div class="advantageImg advantageImg_d7"><img src="../../assets/images/navice/Ysdb_Jz03.png"></div>
                    <h3 class="advantageCh3">期限灵活</h3>
                    <p>投资期限1天-1年，满足不同理财对于期限的要求。</p>
                    <div class="advantageImg advantageImg_d7"><img src="../../assets/images/navice/Ysdb_Jz04.png"></div>
                  </div>
                </div>
                <div class="tab-content tab-content5" id="tab5" style="display: block">
                  <div class="advantageCh3_ts clboth">
                      <p class="ts_title tacr rempadb">银行级系统安全防范措施</p>
                      <p class="ts_alt rempadt">强大的技术团队，核心成员均来自国内领先金融软件供应商，有多年银行核心级系统的研发和运营经验。鑫合汇平台技术底层及应用均属原创研发，架构与代码安全性、稳定性均为银行级别，优于同类平台。确保每个环节均得到最高级别安全防护。</p>
                  </div>
                  <div class="advantageCn advantageCn5">
                      <h2 class="advantageCh2">资金安全与保障</h2>
                      <h3 class="advantageCh3">全方位的安全认证体系</h3>
                      <p class="rempadb">投资人在充值和提现前必须进行实名认证、手机绑定等多重安全认证，<span class="bule">任何帐户资金的提现，只能转出到本人实名绑定的银行账户，</span>完全保障投资人的资金转出安全。</p>
                      <div class="advantageImg advantageImg_d8"><img src="../../assets/images/navice/Ysdb_Js01.png"></div>
                      <h3 class="advantageCh3">严格的资金管理流程</h3>
                      <p>内部严格的资金管理流程和完善安全的系统，所有资金操作都将通过<span class="bule">“专人操作、专人复核”</span>的完成。</p>
                      <div class="advantageImg advantageImg_d1"><img src="../../assets/images/navice/Ysdb_Js02.png"></div>
                      <h3 class="advantageCh3">可追查的行为记录体系</h3>
                      <p>资金流水一览无遗，资金流向全程可追踪，每日资金结算对比，确保支付业务的正确性。</p>
                      <div class="advantageImg advantageImg_d4"><img src="../../assets/images/navice/Ysdb_Js03.png"></div>
                      <h3 class="advantageCh3">网络安全</h3>
                      <p class="addpreC5_P rempadb"><span class="rightDotAc"><i class="doubleRoddot"></i>采用SSL256位数据传输加密保护技术，让客户在进行个人账户管理、充值等涉及敏感信息的操作时，信息自动加密，确保信息的安全传输，通过多重防火墙体系确保服务器和数据的安全。</span></p>
                      <p class="addpreC5_P rempadt"><span class="rightDotAc"><i class="doubleRoddot"></i>采用WAF防火墙，对各类请求进行检测和验证，确保其安全性与合法性，对非法的请求予以实时阻断，对站点进行有效防护。</span></p>
                      <div class="advantageImg advantageImg_d9"><img src="../../assets/images/navice/Ysdb_Js05.png"></div>
                      <h3 class="advantageCh3">服务器集群技术</h3>
                      <p>采用负载均衡集群，有效的分摊系统的工作负载，为用户提供高可用的数据服务。</p>
                      <div class="advantageImg advantageImg_d4"><img src="../../assets/images/navice/Ysdb_Js06.png"></div>
                      <h3 class="advantageCh3">数据安全</h3>
                      <p>多个异地容灾备份点，实时同步系统数据，每份数据具有多个副本，确保数据安全一致。</p>
                      <div class="advantageImg advantageImg_d1"><img src="../../assets/images/navice/Ysdb_Js07.png"></div>
                      <h2 class="advantageCh2">隐私安全</h2>
                      <h3 class="advantageCh3">用户隐私绝对保密</h3>
                      <p>鑫合汇开展业务是建立在与客户彼此信任的基础之上的，为了提供更优质的客户服务和产品，确保投资人提供的所有信息都能得到机密保障，我们采用以下关于信息保护的政策：</p>
                      <p class="addpreC5_P rempadb"><span class="rightDotAc"><i class="doubleRoddot"></i>收集信息的范围仅限于那些本公司认为对了解您的财务需求和开展业务所必需的相关资料,旨在提高提供服务的效率与质量；</span></p>
                      <p class="addpreC5_P rempadt"><span class="rightDotAc"><i class="doubleRoddot"></i>鑫合汇设有严格的安全系统,以防止未经授权的任何人包括本公司的职员获取客户信息；</span></p>
                      <div class="advantageImg advantageImg_d10"><img src="../../assets/images/navice/Ysdb_Js08.png"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li v-if="prjtype===3">
          <summary class="summary3">
            <h2 class="ui-borh2" id="p3" data-scroll="1">鑫合汇的价值</h2>
            <div class="value">
              <dl>
                <dt>累计成交额:</dt>
                <dd class="org" id="allaccount"></dd>
              </dl>
              <dl class="bor-t">
                <dt>近7天成交额:</dt>
                <dd class="green" id="weekaccount"></dd>
              </dl>
              <dl class="bor-t" style="display:none">
                <dt>转让成功率:</dt>
                <dd class="green NewGreen" id="transferrate"></dd>
              </dl>
            </div>
          </summary>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="sass">
  body{
      overflow: auto;
  }
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'

  export default{
    data () {
      return {
        prjtype: 1,
        pullOpts: {
          port: 'listSpecial',
          params: {
            p: 1,
            prj_type: 0,
            status: 0
          }
        }
      }
    },
    components: {
      TitleBar
    },
    events: {
    },
    methods: {
      changeNav: function(n){
        this.prjtype = n;
      }
    }
  }
</script>
