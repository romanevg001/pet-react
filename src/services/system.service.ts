

export class SystemService {

  /*   session: {
          data: undefined,
          awaitInit: undefined,
          wizard: false,
          manageUnsafePass: function () {
            var authCookies = $cookies.getObject("auth");
            if (
              this.data[cookieConst.unsafePass] &&
              !enableUnsafePass() &&
              authCookies
            ) {
              delete authCookies[cookieConst.unsafePass];

              $cookies.putObject("auth", authCookies, {
                path: "/",
                expires: expireDate,
              });
            }

            var authSession = JSON.parse(
              window.sessionStorage.getItem("session")
            );

            if (
              this.data[cookieConst.unsafePass] &&
              !enableUnsafePass() &&
              authSession
            ) {
              delete authSession[cookieConst.unsafePass];
              window.sessionStorage.setItem(
                "session",
                JSON.stringify(authSession)
              );
            }
          },
          init: function (SystemProvider, timeout) {
            var deferred = $q.defer();
            // if(this.data === undefined){
            try {
              var authData;
              var keepme;
              authCookies = $cookies.getObject("auth");
              if (authCookies) {
                this.data = authCookies;
                keepme = true;
              } else {
                this.data = JSON.parse(
                  window.sessionStorage.getItem("session")
                );
                keepme = false;
              }
              if (this.data && !this.data.closed) {
                this.awaitInit = this.data[cookieConst.pin]
                  ? SystemProvider.loginByPin(
                      this.data[cookieConst.username],
                      this.data[cookieConst.pin]
                    )
                  : SystemProvider.login(
                      this.data[cookieConst.username],
                      this.data[cookieConst.unsafePass],
                      this.data[cookieConst.password],
                      keepme,
                      timeout
                    );

                this.awaitInit
                  .then(function () {
                    $rootScope.is_logined = true;
                    return deferred.resolve();
                  })
                  .catch(function () {
                    return deferred.reject();
                  })
                  .finally(function () {
                    SystemProvider.session.awaitInit = undefined;
                  });
              } else {
                this.close();
                deferred.reject();
              }
            } catch (e) {
              this.close();
              deferred.reject();
            }

            // };
            return deferred.promise;
          },
          id: function () {
            return this.data.id++;
          },
          uid: function () {
            return this.data.uid;
          },
          user: function () {
            return window.localStorage.getItem("user") || "";
          },
          keepme: function () {
            return this.data.keepme;
          },
          get_h_user: function () {
            return this.h_user;
          },
          get_session_data: function () {
            return this.data;
          },
          getLang: function () {
            var lng = $cookies.get(cookieConst.language);
            if (lng) {
              $translate.use(lng);
            }
          },
          setLang: function (val) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + cookieConst.expires_time);
            $cookies.put(cookieConst.language, val, {
              path: "/",
              expires: expireDate,
            });
            $translate.use(val);
            $rootScope.curLang = val;
          },
          isAccessByPin: function () {
            return Boolean(this.data.pin);
          },
          isClosed: function () {
            return this.data.closed;
          },
          close: function () {
            this.data = {
              closed: true,
            };

            window.sessionStorage.setItem("session", null);
            $cookies.putObject("auth", null);
            $cookies.put(cookieConst.user_id, null);
            $rootScope.is_logined = false;
          },
          open: function (params) {
            var session = this;
            session.data = {
              id: 1,
              closed: false,
              kepme: params.keepme,
            };

            var isLoginByPin = Boolean(params.pin);

            session.data[cookieConst.username] = params.user;

            if (isLoginByPin) {
              session.data[cookieConst.pin] = params.pin;
            } else {
              session.data[cookieConst.password] = params.passw;
            }

            session.data[cookieConst.session] = params.data.id;

            if (!isLoginByPin && params.provider.enableUnsafePass()) {
              session.data[cookieConst.unsafePass] = params.password;
            }

            if (session.isSessionStorageAvailable()) {
              window.sessionStorage.setItem(
                "session",
                JSON.stringify(session.data)
              );
            }

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + cookieConst.expires_time);

            if (params.keepme) {
              var cookieData = {};
              cookieData[cookieConst.username] = params.user;
              cookieData[cookieConst.password] = params.passw;

              if (params.provider.enableUnsafePass()) {
                cookieData[cookieConst.unsafePass] = params.password;
              }

              $cookies.putObject("auth", cookieData, {
                path: "/",
                expires: expireDate,
              });
            } else {
              $cookies.putObject("auth", cookieData, null);
            }

            if (params.data.id) {
              $cookies.put(cookieConst.user_id, params.data.id, {
                path: "/",
                expires: expireDate,
              });
            } else {
              $cookies.put(cookieConst.user_id, null);
            }

            session.h_user = session.parseUserData(params.data);

            $rootScope.is_logined = true;
          },
          parseUserData: function (data) {
            var h_user = {};
            var a_rights;

            var arrayProp = [
              "sread",
              "swrite",
              "gread",
              "gwrite",
              "cread",
              "cwrite",
            ];
            arrayProp.forEach(function (prop) {
              if (data[prop]) {
                data[prop] = data[prop].replace(/\,$/, "");
              }
            });

            h_user["id"] = data["id"];
            h_user["name"] = data["name"];
            h_user["k"] = data["k"];
            h_user["sread"] =
              data["sread"] == "all" ? true : data["sread"].split(",");
            h_user["swrite"] =
              data["swrite"] == "all" ? true : data["swrite"].split(",");
            h_user["gread"] =
              data["gread"] == "all" ? true : data["gread"].split(",");
            h_user["gwrite"] =
              data["gwrite"] == "all" ? true : data["gwrite"].split(",");
            h_user["cread"] =
              data["cread"] == "all" ? true : data["cread"].split(",");
            h_user["cwrite"] =
              data["cwrite"] == "all" ? true : data["cwrite"].split(",");

            return h_user;
          },
          isSessionStorageAvailable: function () {
            try {
              return (
                "sessionStorage" in window && window["sessionStorage"] !== null
              );
            } catch (e) {
              return false;
            }
          },
        },

        private _rpcCall (querytype: QueryTypeEnum, user, data, timeout, url) {
            var initialData = data;
    
            const params = {
                querytype: querytype,
                k: user,
                data
            };
            try {
                fetch(url || globalConst.engine, { 
                    method: "POST",
                    body: JSON.stringify(params),
                }).then(({data}) => {
                    try {
                       
                        jsonData = xml2json.toJson(data,{trim: true});
                    } catch (e) {
                        return deferred.reject(this.logout(true, 1));
                    }
                });
                console.log("Успех:", JSON.stringify(result));
            } catch (error) {
                console.error("Ошибка:", error);
                //deferred.reject(this.logout(true, 1));
            }


          var deferred = $q.defer();
          $http({
            method: "POST",
            url: url || globalConst.engine,
            data: params,
            timeout: timeout || globalConst.REQUEST_TIMEOUT,
          }).then(
            function (resp) {
              var xml;
              try {
                if (
                  params.querytype === "getcan" ||
                  params.querytype === "gettrace"
                ) {
                  resp.data = resp.data.trim().replace(/\n/g, "&#xA;");
                }
                xml = $.parseXML(resp.data);
              } catch (e) {
                return deferred.reject(this.logout(true, 1));
              }

              var data = $.xml2json(xml);
              var err = $(xml).find("error");

              if (
                err.length &&
                err.attr("type") === globalConst.authorization_error
              ) {
                if (querytype === "auth" || querytype === "authpin") {
                  return deferred.reject({
                    code: 3,
                    message: globalConst.authorization_error,
                  });
                }

                var reCall = function (data) {
                  return $timeout(function () {
                    return SystemProvider._rpcCall(
                      querytype,
                      SystemProvider.session.h_user["k"],
                      initialData,
                      timeout
                    );
                  }, 500);
                };

                var initSessionPromise = SystemProvider.session.awaitInit
                  ? SystemProvider.session.awaitInit
                  : SystemProvider.session.init(SystemProvider);

                if (SystemProvider.session.get_h_user()) {
                  return reCall();
                } else {
                  return initSessionPromise.then(reCall, function () {
                    SystemProvider.logout(true);
                  });
                }
              }

              if (
                err.length &&
                err.attr("type") === globalConst.module_not_supported
              ) {
                return deferred.reject({
                  code: 4,
                  message: "Module not supported",
                });
              }
              if (err.length && err.attr("type") !== "no error") {
                return deferred.reject(data);
              }

              return deferred.resolve(data);
            },
            function (resp) {
              deferred.reject({ code: -13, message: "" });
            }
          );

          return deferred.promise;
        },  */
}


