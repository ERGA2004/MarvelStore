// Этот необязательный код используется для регистрации работника службы.
// register() по умолчанию не вызывается.

// Это позволяет приложению быстрее загружаться при последующих посещениях в рабочей среде и дает
// это автономные возможности. Однако это также означает, что разработчики (и пользователи)
// будет видеть развернутые обновления только при последующих посещениях страницы, после того, как все
// существующие вкладки, открытые на странице, были закрыты, поскольку ранее кэшировались
// ресурсы обновляются в фоновом режиме.


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    
    window.location.hostname === '[::1]' ||
    
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Конструктор URL доступен во всех браузерах, поддерживающих SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {

// Наш сервисный работник не будет работать, если PUBLIC_URL находится в другом источнике
 // с того, на чем обслуживается наша страница. Это может произойти, если CDN используется для
// обслуживания активов; см. 
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Это выполняется на localhost. Давайте проверим, существует ли еще сервисный работник или нет.
        checkValidServiceWorker(swUrl, config);

        // Добавьте некоторые дополнительные записи в localhost, указав разработчикам на документацию 
        // service worker/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Не является локальным хостом. Просто зарегистрируйте сервисного работника
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // На данный момент было извлечено обновленное предварительно кэшированное содержимое,
              // но предыдущий работник службы по-прежнему будет обслуживать более старое
              // содержимое до тех пор, пока не будут закрыты все клиентские вкладки.
              console.log(
                'Новый контент доступен и будет использоваться, когда все вкладки  ' +
                  'на этой странице будут закрыты. . видишь https://bit.ly/CRA-PWA.'
              );

              // // Выполнить callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // На данный момент все было предварительно обработано.
              // Это идеальное время для отображения сообщения
              // "Содержимое кэшируется для использования в автономном режиме".
              console.log('Content is cached for offline use.');

              // Выполнять callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Проверьте, можно ли найти обслуживающего работника. Если он не может перезагрузить страницу.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Убедитесь, что service worker существует и что мы действительно получаем JS-файл.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Работник службы поддержки не найден. Вероятно, это другое приложение. Перезагрузите страницу.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Найден работник службы. Действуйте как обычно.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Подключение к Интернету не найдено. Приложение работает в автономном режиме.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
