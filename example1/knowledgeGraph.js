(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["knowledgeGraph"] = factory();
	else
		root["knowledgeGraph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cameraController = __webpack_require__(4);

var _cameraController2 = _interopRequireDefault(_cameraController);

var _mouseEvents = __webpack_require__(9);

var _mouseEvents2 = _interopRequireDefault(_mouseEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorldManager = function () {
  function WorldManager(options) {
    _classCallCheck(this, WorldManager);

    console.log("Create WorldManager");

    this.container = "";

    // set some camera attributes
    var VIEWANGLE = 45;
    var WIDTH = 800;
    var HEIGHT = 600;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(WIDTH, HEIGHT);
    this.scene = new THREE.Scene();

    //Add Camera 
    this.camera = new THREE.PerspectiveCamera(VIEWANGLE, ASPECT, NEAR, FAR);
    this.camera.position.set(0, 1000, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.updateProjectionMatrix();
    this.scene.add(this.camera);

    this.mouseEvents = new _mouseEvents2.default();
    this.cameraController = new _cameraController2.default();

    this._entitiesGroup = new THREE.Object3D();
    this.scene.add(this._entitiesGroup);

    this._linksGroup = new THREE.Object3D();
    this.scene.add(this._linksGroup);

    this._entitiesInScene = [];
  }

  _createClass(WorldManager, [{
    key: "init",
    value: function init(options) {
      //Add scene into element
      this.container = $(options.container);
      this.container.append(this.renderer.domElement);

      //init Mouse Controllers
      this.mouseEvents.init(this.camera, this.renderer, this._entitiesGroup);
      this.cameraController.init(this.camera, this.renderer, this.scene);

      this._createScene();
    }
  }, {
    key: "getCamera",
    value: function getCamera() {
      return this.camera;
    }
  }, {
    key: "getRenderer",
    value: function getRenderer() {
      return this.renderer;
    }
  }, {
    key: "addToScene",
    value: function addToScene(obj) {
      this._entitiesGroup.add(obj);
    }
  }, {
    key: "removeFromScene",
    value: function removeFromScene(obj) {
      this._entitiesGroup.remove(obj);
    }
  }, {
    key: "addLinkMeshToScene",
    value: function addLinkMeshToScene(mesh) {
      this._linksGroup.add(mesh);
    }
  }, {
    key: "removeAllLinksMeshs",
    value: function removeAllLinksMeshs() {
      while (this._linksGroup.children.length > 0) {
        this._linksGroup.remove(this._linksGroup.children[0]);
      }
    }
  }, {
    key: "getEntitiesInScene",
    value: function getEntitiesInScene() {
      return this._entitiesInScene;
    }
  }, {
    key: "addEntityInScene",
    value: function addEntityInScene(entity) {
      var _this = this;

      var entities = [].concat(entity);
      entities.forEach(function (currentEntity) {
        if (!_this.isEntityInScene(currentEntity)) {
          _this._entitiesInScene.push(currentEntity);
          _this._entitiesGroup.add(currentEntity.getMesh());
        }
      });
    }
  }, {
    key: "isEntityInScene",
    value: function isEntityInScene(entity) {
      return this._entitiesInScene.includes(entity);
    }
  }, {
    key: "removeEntityFromScene",
    value: function removeEntityFromScene(entity) {
      var _this2 = this;

      var entities = [].concat(entity);
      entities.forEach(function (currentEntity) {
        var index = _this2._entitiesInScene.indexOf(currentEntity);
        if (index > -1) {
          _this2._entitiesInScene.splice(index, 1);
          _this2._entitiesGroup.remove(currentEntity.getMesh());
        }
      });
    }
  }, {
    key: "run",
    value: function run() {
      this._animate();
    }
  }, {
    key: "_createScene",
    value: function _createScene() {
      //Lights
      var pointLight = new THREE.PointLight(0xFFFFFF);
      pointLight.position.set(1000, 1000, 0);
      this.scene.add(pointLight);
    }
  }, {
    key: "_animate",
    value: function _animate() {
      requestAnimationFrame(this._animate.bind(this));
      this.renderer.render(this.scene, this.camera);
      this.cameraController.getControls().update();
      TWEEN.update();
    }
  }]);

  return WorldManager;
}();

var sc = new WorldManager();
exports.default = sc;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _signals = __webpack_require__(12);

var _signals2 = _interopRequireDefault(_signals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
//custom object that dispatch a `started` signal
var myObject = {
  started : new signals.Signal()
};
function onStarted(param1, param2){
  alert(param1 + param2);
}
myObject.started.add(onStarted); //add listener
myObject.started.dispatch('foo', 'bar'); //dispatch signal passing custom parameters
myObject.started.remove(onStarted); //remove a single list
*/

var events = function () {
  function events() {
    _classCallCheck(this, events);

    this._map = new Map();
  }

  _createClass(events, [{
    key: "initEvent",
    value: function initEvent(eventName) {
      console.log("add event " + eventName);
      this._map.set(eventName, new _signals2.default.Signal());
    }
  }, {
    key: "addListener",
    value: function addListener(eventName, cb) {
      var event = this._map.get(eventName);
      if (!event) {
        console.warn("There is no event " + eventName);return;
      }
      event.add(cb);
    }
  }, {
    key: "removeListener",
    value: function removeListener(eventName, cb) {
      console.log("TODO");
    }
  }, {
    key: "emitEvent",
    value: function emitEvent(eventName, parameters) {
      var event = this._map.get(eventName);
      if (!event) {
        console.warn("There is no event " + eventName);return;
      }
      event.dispatch(parameters);
    }
  }]);

  return events;
}();

var ev = new events();
exports.default = ev;

//events

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _worldManager = __webpack_require__(0);

var _worldManager2 = _interopRequireDefault(_worldManager);

var _entity = __webpack_require__(7);

var _entity2 = _interopRequireDefault(_entity);

var _entityLink = __webpack_require__(3);

var _entityLink2 = _interopRequireDefault(_entityLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataManager = function () {
  function DataManager() {
    _classCallCheck(this, DataManager);

    this._map = new Map();
    console.log("Create DataManager");
  }

  _createClass(DataManager, [{
    key: "addEntity",
    value: function addEntity(entity) {
      this._map.set(entity.getName(), entity);
    }
  }, {
    key: "getEntity",
    value: function getEntity(name) {
      return this._map.get(name);
    }
  }, {
    key: "getEntities",
    value: function getEntities() {
      return this._map;
    }
  }, {
    key: "load",
    value: function load(object, cb) {
      var _this = this;

      object.data.forEach(function (ent) {
        var newEntity = new _entity2.default(ent.name, ent.icon);
        _this.addEntity(newEntity);
      });

      object.links.forEach(function (link) {
        var entityFrom = _this.getEntity(link.from);
        var entityTo = _this.getEntity(link.to);

        if (entityTo && entityFrom) {
          var newLink = new _entityLink2.default(entityFrom, entityTo, link.link);
          entityFrom.addLink(newLink);
        } else {
          if (!entityFrom) console.warn("Link " + link.link + " seems corrupted. Can't find " + link.from + " ");
          if (!entityTo) console.warn("Link " + link.link + " seems corrupted. Can't find " + link.to + " ");
        }
      });
      cb();
    }
  }, {
    key: "init",
    value: function init() {}
  }]);

  return DataManager;
}();

var _dataManager = new DataManager();
exports.default = _dataManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityLink = function () {
	function EntityLink(fromEntity, toEntity, type) {
		_classCallCheck(this, EntityLink);

		//TODO from & to here
		this._fromEntity = fromEntity;
		this._toEntity = toEntity;
		this._type = type;
	}

	_createClass(EntityLink, [{
		key: "getToEntity",
		value: function getToEntity() {
			return this._toEntity;
		}
	}, {
		key: "getFromEntity",
		value: function getFromEntity() {
			return this._fromEntity;
		}
	}, {
		key: "getType",
		value: function getType() {
			return this._type;
		}
	}]);

	return EntityLink;
}();

exports.default = EntityLink;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //https://github.com/AdactiveSAS/adsum-web-map/blob/master/src/engine/controllers/CameraController.js#L415

var _OrbitControls = __webpack_require__(8);

var _OrbitControls2 = _interopRequireDefault(_OrbitControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CameraController = function () {
  function CameraController() {
    _classCallCheck(this, CameraController);

    console.log("Create CameraController");
    this._camera = null;
    this._controls = null;
  }

  _createClass(CameraController, [{
    key: "init",
    value: function init(camera, renderer, scene) {
      this._camera = camera;
      this._camera.position.set(0, 300, 0);
      this._camera.lookAt(new THREE.Vector3(0, 0, 0));
      this._camera.updateProjectionMatrix();
      this._controls = new THREE.OrbitControls(this._camera, renderer.domElement);
    }
  }, {
    key: "getControls",
    value: function getControls() {
      return this._controls;
    }

    //Center on an Object

  }, {
    key: "centerOn",
    value: function centerOn(selectedObject) {
      var _this = this;

      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;


      var animationDuration = 600;
      var from = {
        positionx: this._camera.position.x,
        positiony: this._camera.position.y,
        positionz: this._camera.position.z,
        targetx: this._controls.center.x,
        targety: this._controls.center.y,
        targetz: this._controls.center.z
      };

      var to = {
        positionx: selectedObject.position.x,
        positiony: selectedObject.position.y + zoom,
        positionz: selectedObject.position.z,
        targetx: selectedObject.position.x,
        targety: selectedObject.position.y,
        targetz: selectedObject.position.z
      };

      var tween = new TWEEN.Tween(from).to(to, animationDuration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        _this._camera.lookAt(from.targetx, from.targety, from.targetz);
        _this._camera.position.set(from.positionx, from.positiony, from.positionz);
        _this._controls.center.set(from.targetx, from.targety, from.targetz);

        _this._camera.updateProjectionMatrix();
        _this._controls.update();
      }).onComplete(function () {
        //  this._camera.lookAt(to.positionx,to.positiony,to.positionz);
        // this._controls.center.set(to.targetx,to.targety,to.targetz);
      }).start();
    }
  }]);

  return CameraController;
}();

exports.default = CameraController;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBoxMesh = createBoxMesh;
exports.createSphereMesh = createSphereMesh;
exports.createLine = createLine;
function createBoxMesh(image, size, position) {
	var texloader = new THREE.TextureLoader();
	var ObjectTexture = texloader.load(image);
	var cubeGeometry = new THREE.CubeGeometry(size, 5, size);

	//TODO var maxAnisotropy = renderer.getMaxAnisotropy();
	var maxAnisotropy = 16;
	ObjectTexture.anisotropy = maxAnisotropy;

	var mesh = new THREE.Mesh(cubeGeometry.clone(), new THREE.MeshBasicMaterial(new THREE.MeshBasicMaterial({ map: ObjectTexture })));

	return mesh;
}

function createSphereMesh(image, size, position) {

	var texloader = new THREE.TextureLoader();
	var spacetex = texloader.load(image);

	var MainMaterial = new THREE.MeshBasicMaterial({ map: spacetex, color: 0xffffff, transparent: true });
	var mainGeometry = new THREE.CylinderGeometry(20, 20, 3, 30, 40);
	var mesh = new THREE.Mesh(mainGeometry, MainMaterial);

	return mesh;
}

function createLine(fromPositionx, fromPositiony, fromPositionz, toPositionx, toPositiony, toPositionz) {
	var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0xffffff;

	var lineGeometry = new THREE.Geometry();
	var vertArray = lineGeometry.vertices;
	vertArray.push(new THREE.Vector3(fromPositionx, fromPositiony, fromPositionz), new THREE.Vector3(toPositionx, toPositiony, toPositionz));
	lineGeometry.computeLineDistances();
	var lineMaterial = new THREE.LineBasicMaterial({ color: color });
	var line = new THREE.Line(lineGeometry, lineMaterial);
	return line;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.select = select;

var _worldManager = __webpack_require__(0);

var _worldManager2 = _interopRequireDefault(_worldManager);

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

var _dataManager = __webpack_require__(2);

var _dataManager2 = _interopRequireDefault(_dataManager);

var _meshUtils = __webpack_require__(5);

var meshUtils = _interopRequireWildcard(_meshUtils);

var _textUtils = __webpack_require__(10);

var textUtils = _interopRequireWildcard(_textUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function select(selectedEntity) {

  var connectedEntities = selectedEntity.getLinks().map(function (ent) {
    return ent.getToEntity();
  });
  var entitiesInScene = _worldManager2.default.getEntitiesInScene();

  var entitiesToAddToScene = connectedEntities.filter(function (entity) {
    return !entitiesInScene.includes(entity);
  });
  var entitiesToRemoveFromScene = entitiesInScene.filter(function (entity) {
    return !connectedEntities.includes(entity) && entity !== selectedEntity;
  });

  // add current to scene
  if (!_worldManager2.default.isEntityInScene(selectedEntity)) {
    _worldManager2.default.addEntityInScene(selectedEntity);
    selectedEntity.setPosition(0, 0, 0);
  }

  _worldManager2.default.removeEntityFromScene(entitiesToRemoveFromScene);
  _worldManager2.default.addEntityInScene(entitiesToAddToScene);
  _worldManager2.default.removeAllLinksMeshs();

  //TODO : To be adjust dynamically later
  var radius = 70;
  var portionAngle = 2 * Math.PI / connectedEntities.length;

  selectedEntity.getLinks().reduce(function (accAngle, link) {

    accAngle += portionAngle;
    var newX = selectedEntity.getPosition().x + radius * Math.cos(accAngle);
    var newZ = selectedEntity.getPosition().z + radius * Math.sin(accAngle);

    link.getToEntity().setPosition(newX, 0, newZ);

    setTimeout(function () {
      _worldManager2.default.addLinkMeshToScene(meshUtils.createLine(selectedEntity.getPosition().x, selectedEntity.getPosition().y, selectedEntity.getPosition().z, newX, 0, newZ));
      var textPosition = new THREE.Vector3((selectedEntity.getPosition().x + newX) / 2, 0, (selectedEntity.getPosition().z + newZ) / 2);
      _worldManager2.default.addLinkMeshToScene(textUtils.createTextSprite(link.getType(), textPosition, { fontsize: 48, borderColor: { r: 255, g: 0, b: 0, a: 1.0 }, backgroundColor: { r: 255, g: 255, b: 255, a: 1 } }));
    }, 800);

    return accAngle;
  }, 0);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _worldManager = __webpack_require__(0);

var _worldManager2 = _interopRequireDefault(_worldManager);

var _entityLink = __webpack_require__(3);

var _entityLink2 = _interopRequireDefault(_entityLink);

var _meshUtils = __webpack_require__(5);

var meshUtils = _interopRequireWildcard(_meshUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
	function Entity(name, image) {
		_classCallCheck(this, Entity);

		this._name = name;
		this._image = image;
		this._links = [];
		this._mesh = this._createMesh();
	}

	_createClass(Entity, [{
		key: "addLink",
		value: function addLink(link) {
			this._links.push(link);
		}
	}, {
		key: "getName",
		value: function getName() {
			return this._name;
		}
	}, {
		key: "getImage",
		value: function getImage() {
			return this._images;
		}
	}, {
		key: "getLinks",
		value: function getLinks() {
			return this._links;
		}
	}, {
		key: "getMesh",
		value: function getMesh() {
			return this._mesh;
		}
	}, {
		key: "getPosition",
		value: function getPosition() {
			return this._mesh.position;
		}
	}, {
		key: "setPosition",
		value: function setPosition(x, y, z) {
			var _this = this;

			var from = this._mesh.position;
			var to = { x: x, y: y, z: z };
			var animationDuration = 500;

			var tween = new TWEEN.Tween(from).to(to, animationDuration).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
				_this._mesh.position.set(from.x, from.y, from.z);
			}).onComplete(function () {}).start();
		}
	}, {
		key: "setColor",
		value: function setColor(color) {
			this._mesh.material.color.setHex(color);
		}
	}, {
		key: "_createMesh",
		value: function _createMesh() {
			var mesh = meshUtils.createBoxMesh(this._image, 15, 0);
			mesh.name = "Mesh_" + this._name;
			mesh.userData.entity = this;
			return mesh;
		}
	}]);

	return Entity;
}();

exports.default = Entity;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */

exports.default = THREE.OrbitControls = function (object, domElement) {

		this.object = object;
		this.domElement = domElement !== undefined ? domElement : document;

		// API

		this.enabled = true;

		this.center = new THREE.Vector3();

		this.userZoom = true;
		this.userZoomSpeed = 1.0;

		this.userRotate = true;
		this.userRotateSpeed = 1.0;

		this.userPan = true;
		this.userPanSpeed = 2.0;

		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		this.minDistance = 0;
		this.maxDistance = Infinity;

		// 65 /*A*/, 83 /*S*/, 68 /*D*/
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40, ROTATE: 65, ZOOM: 83, PAN: 68 };

		// internals

		var scope = this;

		var EPS = 0.000001;
		var PIXELS_PER_ROUND = 1800;

		var rotateStart = new THREE.Vector2();
		var rotateEnd = new THREE.Vector2();
		var rotateDelta = new THREE.Vector2();

		var zoomStart = new THREE.Vector2();
		var zoomEnd = new THREE.Vector2();
		var zoomDelta = new THREE.Vector2();

		var phiDelta = 0;
		var thetaDelta = 0;
		var scale = 1;

		var lastPosition = new THREE.Vector3();

		var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };
		var state = STATE.NONE;

		// events

		var changeEvent = { type: 'change' };

		this.rotateLeft = function (angle) {

				if (angle === undefined) {

						angle = getAutoRotationAngle();
				}

				thetaDelta -= angle;
		};

		this.rotateRight = function (angle) {

				if (angle === undefined) {

						angle = getAutoRotationAngle();
				}

				thetaDelta += angle;
		};

		this.rotateUp = function (angle) {

				if (angle === undefined) {

						angle = getAutoRotationAngle();
				}

				phiDelta -= angle;
		};

		this.rotateDown = function (angle) {

				if (angle === undefined) {

						angle = getAutoRotationAngle();
				}

				phiDelta += angle;
		};

		this.zoomIn = function (zoomScale) {

				if (zoomScale === undefined) {

						zoomScale = getZoomScale();
				}

				scale /= zoomScale;
		};

		this.zoomOut = function (zoomScale) {

				if (zoomScale === undefined) {

						zoomScale = getZoomScale();
				}

				scale *= zoomScale;
		};

		this.pan = function (distance) {

				distance.transformDirection(this.object.matrix);
				distance.multiplyScalar(scope.userPanSpeed);

				this.object.position.add(distance);
				this.center.add(distance);
		};

		this.update = function () {

				var position = this.object.position;
				var offset = position.clone().sub(this.center);

				// angle from z-axis around y-axis

				var theta = Math.atan2(offset.x, offset.z);

				// angle from y-axis

				var phi = Math.atan2(Math.sqrt(offset.x * offset.x + offset.z * offset.z), offset.y);

				if (this.autoRotate) {

						this.rotateLeft(getAutoRotationAngle());
				}

				theta += thetaDelta;
				phi += phiDelta;

				// restrict phi to be between desired limits
				phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

				// restrict phi to be betwee EPS and PI-EPS
				phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

				var radius = offset.length() * scale;

				// restrict radius to be between desired limits
				radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

				offset.x = radius * Math.sin(phi) * Math.sin(theta);
				offset.y = radius * Math.cos(phi);
				offset.z = radius * Math.sin(phi) * Math.cos(theta);

				position.copy(this.center).add(offset);

				this.object.lookAt(this.center);

				thetaDelta = 0;
				phiDelta = 0;
				scale = 1;

				if (lastPosition.distanceTo(this.object.position) > 0) {

						this.dispatchEvent(changeEvent);

						lastPosition.copy(this.object.position);
				}
		};

		function getAutoRotationAngle() {

				return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
		}

		function getZoomScale() {

				return Math.pow(0.95, scope.userZoomSpeed);
		}

		function onMouseDown(event) {

				if (scope.enabled === false) return;
				if (scope.userRotate === false) return;

				event.preventDefault();

				if (state === STATE.NONE) {
						if (event.button === 0) state = STATE.ROTATE;
						if (event.button === 1) state = STATE.ZOOM;
						if (event.button === 2) state = STATE.PAN;
				}

				if (state === STATE.ROTATE) {

						//state = STATE.ROTATE;

						rotateStart.set(event.clientX, event.clientY);
				} else if (state === STATE.ZOOM) {

						//state = STATE.ZOOM;

						zoomStart.set(event.clientX, event.clientY);
				} else if (state === STATE.PAN) {

						//state = STATE.PAN;

				}

				document.addEventListener('mousemove', onMouseMove, false);
				document.addEventListener('mouseup', onMouseUp, false);
		}

		function onMouseMove(event) {

				if (scope.enabled === false) return;

				event.preventDefault();

				if (state === STATE.ROTATE) {

						rotateEnd.set(event.clientX, event.clientY);
						rotateDelta.subVectors(rotateEnd, rotateStart);

						scope.rotateLeft(2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed);
						scope.rotateUp(2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed);

						rotateStart.copy(rotateEnd);
				} else if (state === STATE.ZOOM) {

						zoomEnd.set(event.clientX, event.clientY);
						zoomDelta.subVectors(zoomEnd, zoomStart);

						if (zoomDelta.y > 0) {

								scope.zoomIn();
						} else {

								scope.zoomOut();
						}

						zoomStart.copy(zoomEnd);
				} else if (state === STATE.PAN) {

						var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
						var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

						scope.pan(new THREE.Vector3(-movementX, movementY, 0));
				}
		}

		function onMouseUp(event) {

				if (scope.enabled === false) return;
				if (scope.userRotate === false) return;

				document.removeEventListener('mousemove', onMouseMove, false);
				document.removeEventListener('mouseup', onMouseUp, false);

				state = STATE.NONE;
		}

		function onMouseWheel(event) {

				if (scope.enabled === false) return;
				if (scope.userZoom === false) return;

				var delta = 0;

				if (event.wheelDelta) {
						// WebKit / Opera / Explorer 9

						delta = event.wheelDelta;
				} else if (event.detail) {
						// Firefox

						delta = -event.detail;
				}

				if (delta > 0) {

						scope.zoomOut();
				} else {

						scope.zoomIn();
				}
		}

		function onKeyDown(event) {

				if (scope.enabled === false) return;
				if (scope.userPan === false) return;

				switch (event.keyCode) {

						/*case scope.keys.UP:
      	scope.pan( new THREE.Vector3( 0, 1, 0 ) );
      	break;
      case scope.keys.BOTTOM:
      	scope.pan( new THREE.Vector3( 0, - 1, 0 ) );
      	break;
      case scope.keys.LEFT:
      	scope.pan( new THREE.Vector3( - 1, 0, 0 ) );
      	break;
      case scope.keys.RIGHT:
      	scope.pan( new THREE.Vector3( 1, 0, 0 ) );
      	break;
      */
						case scope.keys.ROTATE:
								state = STATE.ROTATE;
								break;
						case scope.keys.ZOOM:
								state = STATE.ZOOM;
								break;
						case scope.keys.PAN:
								state = STATE.PAN;
								break;

				}
		}

		function onKeyUp(event) {

				switch (event.keyCode) {

						case scope.keys.ROTATE:
						case scope.keys.ZOOM:
						case scope.keys.PAN:
								state = STATE.NONE;
								break;
				}
		}

		this.domElement.addEventListener('contextmenu', function (event) {
				event.preventDefault();
		}, false);
		this.domElement.addEventListener('mousedown', onMouseDown, false);
		this.domElement.addEventListener('mousewheel', onMouseWheel, false);
		this.domElement.addEventListener('DOMMouseScroll', onMouseWheel, false); // firefox
		window.addEventListener('keydown', onKeyDown, false);
		window.addEventListener('keyup', onKeyUp, false);
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cameraController = __webpack_require__(4);

var _cameraController2 = _interopRequireDefault(_cameraController);

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var raycaster = new THREE.Raycaster();

var mouseEvents = function () {
  function mouseEvents() {
    _classCallCheck(this, mouseEvents);

    this._mouse = null;

    this._camera = null;
    this._renderer = null;
    this._sceneGroup = null;

    this._selectedObjects = [];

    _events2.default.initEvent("EntityClicked");
    _events2.default.initEvent("EntityHoverOn");
    _events2.default.initEvent("EntityHoverOff");
  }

  _createClass(mouseEvents, [{
    key: "init",
    value: function init(camera, renderer, sceneGroup) {

      this._camera = camera;
      this._renderer = renderer;
      this._sceneGroup = sceneGroup;
      this._mouse = new THREE.Vector2();

      document.addEventListener('mousedown', this._onDocumentMouseDown.bind(this), false);
      document.addEventListener('mousemove', this._onDocumentMouseMove.bind(this), false);
    }
  }, {
    key: "_getEntity",
    value: function _getEntity(event) {

      // update the mouse variable
      this._mouse.x = event.clientX / this._renderer.domElement.clientWidth * 2 - 1;
      this._mouse.y = -(event.clientY / this._renderer.domElement.clientHeight) * 2 + 1;

      raycaster.setFromCamera(this._mouse, this._camera);
      var intersects = raycaster.intersectObjects(this._sceneGroup.children);
      if (intersects.length > 0) return intersects[0].object.userData.entity;

      return null;
    }
  }, {
    key: "_onDocumentMouseDown",
    value: function _onDocumentMouseDown(event) {
      var entity = this._getEntity(event);
      if (entity) {
        _events2.default.emitEvent("EntityClicked", entity);
      }
    }
  }, {
    key: "_onDocumentMouseMove",
    value: function _onDocumentMouseMove(event) {
      var entity = this._getEntity(event);

      if (entity && !this._selectedObjects.includes(entity)) {
        _events2.default.emitEvent("EntityHoverOn", entity);
        this._selectedObjects.push(entity);
      } else if (!entity && this._selectedObjects.length) {
        this._selectedObjects.forEach(function (selectedEntity) {
          _events2.default.emitEvent("EntityHoverOff", selectedEntity);
        });
        this._selectedObjects = [];
      }
    }
  }]);

  return mouseEvents;
}();

exports.default = mouseEvents;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTextSprite = createTextSprite;
function createTextSprite(message, position, parameters) {
    if (parameters === undefined) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 70;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 255, g: 0, b: 0, a: 1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText(message);
    var textWidth = metrics.width;

    context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;

    var width = (textWidth + borderThickness * 2) * 1.1;
    var height = fontsize * 1.4 + borderThickness * 2;

    roundRect(context, borderThickness / 2, borderThickness / 2, width, height, 8);

    context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
    context.fillText(message, borderThickness * 2, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter; // NearestFilter;
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    var sprite = new THREE.Sprite(spriteMaterial);

    sprite.position.set(position.x + 5, 1, position.z + 4);
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);

    return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _worldManager = __webpack_require__(0);

var _worldManager2 = _interopRequireDefault(_worldManager);

var _events = __webpack_require__(1);

var _events2 = _interopRequireDefault(_events);

var _dataManager = __webpack_require__(2);

var _dataManager2 = _interopRequireDefault(_dataManager);

var _repart = __webpack_require__(6);

var repart = _interopRequireWildcard(_repart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
		function knowledgeGraph(options) {
				_classCallCheck(this, knowledgeGraph);

				this._version = "0.0.2";
				console.log("Run " + this._version);

				this.worldManager = _worldManager2.default;
				this.dataManager = _dataManager2.default;
				this.events = _events2.default;

				_worldManager2.default.init(options);
				_dataManager2.default.init(options);

				_worldManager2.default.run();
		}

		_createClass(knowledgeGraph, [{
				key: 'getVersion',
				value: function getVersion() {
						return this._version;
				}
		}, {
				key: 'select',
				value: function select(name) {
						var entity = _dataManager2.default.getEntity(name);
						if (!entity) {
								console.warn("Can't find " + name);return;
						}

						repart.select(entity);
						_worldManager2.default.cameraController.centerOn(entity.getMesh());
				}
		}]);

		return knowledgeGraph;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(true){ //AMD
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return signals; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));


/***/ })
/******/ ]);
});