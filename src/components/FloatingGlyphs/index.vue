<template>
  <div class="c-floating-glyphs" :class="{ 'is-loaded': imagesLoaded }">
    <div class="c-floating-glyphs__canvas" ref="container" />
    <!-- <resize-observer @notify="onResize" /> -->
  </div>
</template>

<script>
import scrollMonitor from 'scrollmonitor'
import load from 'load-asset'
import collect from 'collect.js'
import Matter from 'matter-js'
import MatterWrap from 'matter-wrap'
import { scaleLinear } from 'd3-scale'
import sprite from './sprite.png'

Matter.use(MatterWrap)

const {
  Engine,
  Render,
  World,
  Body,
  Bodies,
  Common,
  Mouse,
  Events,
} = Matter

export default {
  props: {
    hasMouse: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      images: [],
      view: null,
      width: null,
      height: null,
    }
  },

  computed: {
    area() {
      return this.width * this.height
    },

    imagesLoaded() {
      return !!this.images.length
    },

    useMouse() {
      return this.hasMouse && !this.isTouchDevice()
    },
  },

  watch: {
    area(newValue, oldValue) {
      if (oldValue === 0 || !this.imagesLoaded) {
        return
      }

      this.stop()
      this.start()
    },
  },

  methods: {
    isTouchDevice() {
      const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
      const mq = query => window.matchMedia(query).matches

      // eslint-disable-next-line
      if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
        return true
      }

      const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')

      return mq(query)
    },

    imageDataToImage(imagedata) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = imagedata.width
      canvas.height = imagedata.height
      ctx.putImageData(imagedata, 0, 0)
      const image = new Image()
      image.src = canvas.toDataURL()
      return image
    },

    start() {
      this.engine = Engine.create()
      this.engine.world.gravity.x = 0
      this.engine.world.gravity.y = 0

      this.render = Render.create({
        element: this.$refs.container,
        engine: this.engine,
        options: {
          wireframes: false,
          background: 'transparent',
          pixelRatio: 'auto',
          width: this.width,
          height: this.height,
          showDebug: false,
          showBroadphase: false,
          showBounds: false,
          showVelocity: false,
          showCollisions: false,
          showSeparations: false,
          showAxes: false,
          showPositions: false,
          showAngleIndicator: false,
          showIds: false,
          showShadows: false,
          showVertexNumbers: false,
          showConvexHulls: false,
          showInternalEdges: false,
          showMousePosition: false,
        },
      })

      const count = Math.floor((this.width * this.height) / 8000)
      const canvasStartX = -this.width * 0.2
      const canvasStartY = -this.height * 0.2
      const canvasEndX = this.width * 1.2
      const canvasEndY = this.height * 1.2
      const baseSize = scaleLinear()
        .domain([400, 1200])
        .range([50, 80])
        .clamp(true)(window.innerWidth)

      for (let i = 0; i < count; i += 1) {
        const image = collect(this.images).random()
        const spriteSize = image.width
        const size = Common.random(baseSize, baseSize * 1.8)
        const body = Bodies.rectangle(
          Common.random(canvasStartX, canvasEndX),
          Common.random(canvasStartY, canvasEndY),
          size,
          size,
          {
            friction: 0,
            frictionAir: 0,
            restitution: 0.8,
            slop: 0,
            chamfer: {
              radius: 10,
            },
            render: {
              fillStyle: '#F25D48',
              sprite: {
                xScale: size / spriteSize,
                yScale: size / spriteSize,
                texture: image.src,
              },
            },
            plugin: {
              wrap: {
                min: {
                  x: canvasStartX,
                  y: canvasStartY,
                },
                max: {
                  x: canvasEndX,
                  y: canvasEndY,
                },
              },
            },
          },
        )

        Body.setVelocity(body, {
          x: Common.random(-3, 3),
          y: Common.random(-3, 3),
        })

        Body.rotate(body, Common.random(0, 360))

        World.add(this.engine.world, body)
      }

      if (this.useMouse) {
        this.mouse = Mouse.create(document.body)
        this.mouse.element.removeEventListener('mousewheel', this.mouse.mousewheel)
        this.mouse.element.removeEventListener('DOMMouseScroll', this.mouse.mousewheel)

        const { x, y } = this.getMousePosition()

        this.mouseBody = Bodies.circle(x, y, 15, {
          mass: 2,
          restitution: 0.8,
          slop: 0,
          friction: 0,
          frictionAir: 0,
          inertia: Infinity,
          radius: 30,
          render: {
            fillStyle: 'rgba(0,0,0,0)',
          },
        })
        World.add(this.engine.world, this.mouseBody)
      }

      Engine.run(this.engine)
      Render.run(this.render)

      if (this.useMouse) {
        Events.on(this.engine, 'afterUpdate', this.handleUpdate)
      }
    },

    getMousePosition() {
      const bounds = this.render.canvas.getBoundingClientRect()
      const x = this.mouse.position.x - window.pageXOffset - bounds.x
      const y = this.mouse.position.y - window.pageYOffset - bounds.y

      return { x, y }
    },

    handleUpdate() {
      if (!this.mouse.position.x) {
        return
      }

      const { x, y } = this.getMousePosition()

      Body.setVelocity(this.mouseBody, {
        x: x - this.mouseBody.position.x,
        y: y - this.mouseBody.position.y,
      })
    },

    setDimensions() {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    },

    stop() {
      this.$refs.container.innerHTML = ''

      if (this.render) {
        this.render.textures = {}
        Render.stop(this.render)
      }

      if (this.engine) {
        this.engine.events = {}
        Events.off(this.engine, 'afterUpdate', this.handleUpdate)
        World.clear(this.engine.world)
        Engine.clear(this.engine)
      }
    },

    onResize() {
      this.setDimensions()
    },

    init() {
      this.setDimensions()
      this.start()
    },

    destroy() {
      this.stop()
    },
  },

  mounted() {
    if (this.reducedMotion) {
      return
    }

    this.view = scrollMonitor.create(this.$el, { top: 50, bottom: 50 })

    load(sprite)
      .then(image => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)

        const tileWidth = 300
        const tileHeight = 300
        const tilesX = image.width / tileWidth
        const tilesY = image.height / tileHeight
        const images = []

        for (let i = 0; i < tilesY; i += 1) {
          for (let j = 0; j < tilesX; j += 1) {
            const imageData = ctx.getImageData(j * tileWidth, i * tileHeight, tileWidth, tileHeight)
            const tile = this.imageDataToImage(imageData)
            images.push(tile)
          }
        }

        this.images = images
        this.$nextTick(() => {
          this.view.enterViewport(this.init)
          this.view.exitViewport(this.destroy)
        })
      })
  },

  beforeDestroy() {
    this.destroy()

    if (this.view) {
      this.view.destroy()
    }
  },
}
</script>

<style lang="scss" src="./style.scss"></style>
