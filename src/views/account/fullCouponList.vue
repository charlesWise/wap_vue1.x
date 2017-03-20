<template>
  <section class="award-content">
    <h3>可用：full10.10元</h3>
    <article class="red-packet">
      <dl>
        <dt><p class="money"><span>￥</span>10<span>.10</span><em><i>已使用</i></em></p><p class="source">来源：参与阵营挑战</p></dt>
        <dd><p>使用比例: <span>1%</span></p><p class="condition">使用条件: <span>30天≤投资期限≤365天仅限日益升,月益升,年益升使用投资期限≤365天仅限日益升,月益升,年益升使用</span></p><time><i class="use-hours"></i>2016/02/19-2016/03/19</time></dd>
      </dl>
      <dl>
        <dt><p class="money"><span>￥</span>10<span>.10</span><em><i>已使用</i></em></p><p class="source">来源：参与阵营挑战</p></dt>
        <dd><p>使用比例: <span>1%</span></p><p class="condition">使用条件: <span>30天≤投资期限≤365天仅限日益升,月益升,年益升使用投资期限≤365天仅限日益升,月益升,年益升使用</span></p><time><i class="use-hours"></i>2016/02/19-2016/03/19</time></dd>
      </dl>
      <dl>
        <dt><p class="money"><span>￥</span>10<span>.10</span></p><p class="source">来源：参与阵营挑战</p></dt>
        <dd><p>使用比例: <span>1%</span></p><p class="condition">使用条件: <span>30天≤投资期限≤365天仅限日益升,月益升,年益升使用投资期限≤365天仅限日益升,月益升,年益升使用</span></p><time><i class="use-hours"></i>2016/02/19-2016/03/19</time></dd>
      </dl>
    </article>
    <p class="history">没有更多记录<a v-link="{name: 'fullCouponHistory'}">点击查看历史</a></p>
  </section>
</template>
<style>
</style>
<script>

    export default{
        data(){
            return{
                title:''
            }
        },
        components:{

        },
        methods: {
            historyback: function () {
                window.history.go(-1)
          }
        }
    }
</script>
