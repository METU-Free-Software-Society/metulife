<p align="center">
  <img src="https://metu.life/img/logo_siyah.svg" max-width="60%" max-height="60%">
</p>

[metu.life](https://metu.life/); ActivityPub protokolü kullanan, [Mastodon](https://github.com/tootsuite/mastodon) tabanlı bir [glitch-soc](https://github.com/glitch-soc/mastodon) çatalıdır ve [koyu.space](https://github.com/koyuspace/mastodon) yamaları barındırır.

ActivityPub protokolü, sadece metu.life ve Mastodon tabanlı diğer temsillerle değil, bu protokolü kullanan tüm diğer platformlarla  ([PixelFed](https://pixelfed.org/), [PeerTube](https://joinpeertube.org/en/), [Pleroma](https://pleroma.social/) vb.) iletişim kurabilmenizi sağlar.

metu.life, AGPLv3 lisanslı özgür bir yazılımdır.


## Kurulum

metu.life, Mastodon'un `main` dalı temelli olduğu için. Kurulum adımları [Mastodon dökümantasyonunda](https://docs.joinmastodon.org/admin/prerequisites/) belirtildiği gibi gerçekleştirilir. Kurulum rehberinden farklı olarak:

```
git clone https://github.com/tootsuite/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

Yukarıdaki adımlar yerine, aşağıdaki komutu kullanın.

```
git clone https://git.oyd.org.tr/MetuFSS/metu.life.git && cd live
```

### Var olan Mastodon kurulumunu güncellemek

Mastodon'u (veya eski metu.life versiyonunu) güncellemek, Mastodon versiyonları arasında güncellemekle aynı adımları izler. Genellikle aşağıdaki adımları gerektirir:

0. Sunucunuzdaki "mastodon" kullanıcısındaki "live" dizinine geçiş yapın `cd /home/mastodon/live`
1. metu.life'a geçiş yapın
  + Yeni bir uzak depo ekleyin `git remote add metu.life https://git.oyd.org.tr/MetuFSS/metu.life`
  + Depoyu çekin `git fetch metu.life`
  + `master` adındaki dala geçin `git checkout metu.life/master`
2. Kaynak kodunu çekin (genellikle, `git pull`)
3. Gerekli paketleri kurun: `bundle install && yarn install`
4. Konuşlandırma öncesi veritabanı göçü gerçekleştirin: `RAILS_ENV=production SKIP_POST_DEPLOYMENT_MIGRATIONS=true bundle exec rails db:migrate`
5. Ön derleme yapınız: `RAILS_ENV=production bundle exec rails assets:precompile`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bu adım ana Mastodon'a göre daha uzun sürecektir.
6. Hizmetleri tekrar başlatın: `systemctl reload mastodon-web && systemctl restart mastodon-{sidekiq~~treaming}`
7. Rails önbelleğini temizleyin: `RAILS_ENV=production bin/tootctl cache clear`
8. Konuşlandırma sonrası veritabanı göçünü gerçekleştirin: `RAILS_ENV=production bundle exec rails db:migrate`

## Uyarı

Bu proje beta aşamasında olup geliştirilmeye devam edilmektedir.
