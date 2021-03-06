/*
Правильный вариант срабатывания: 3 (сразу же по окончании f один раз).

Планирование setInterval будет вызывать функцию каждые 10 мс после текущего времени. Но так как интерпретатор занят долгой функцией,
то до конца ее работы никакого вызова не происходит.

За время выполнения f может пройти время, на которое запланированы несколько вызовов setInterval,
но в этом случае остается только один, т.е. накопления вызовов не происходит. Такова логика работы setInterval.

После окончания текущего скрипта интерпретатор обращается к очереди запланированных вызовов, видит в ней setInterval и выполняет.
А затем тут же выполняется setTimeout, очередь которого тут же подошла.

Итого, как раз и видим, что setInterval выполнился ровно 1 раз по окончании работы функции. Такое поведение кросс-браузерно.
*/

var i;
var timer = setInterval(function() { // планируем setInterval каждые 10 мс
  i++;
}, 10);

setTimeout(function() { // через 50 мс - отмена setInterval
  clearInterval(timer);
  console.log(i); // (*)
}, 50);

// и запускаем тяжёлую функцию
function f() {
  // точное время выполнения не играет роли
  // здесь оно заведомо больше 100 мс
  for (i = 0; i < 1e8; i++) f[i % 2] = i;
}

f();
