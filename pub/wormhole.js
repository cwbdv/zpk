/**
 * Created by will on 07/08/16.
 */
var Wormhole = function(initPack) {
    var self = {};
    self.id = initPack.id;
    self.x = initPack.x;
    self.y = initPack.y;
    self.w = initPack.w;
    self.h = initPack.h;
    self.r = initPack.r;
    self.g = initPack.g;
    self.b = initPack.b;
    self.area = initPack.area;
    self.destination = initPack.destination;

    self.draw = function() {

        if(Player.list[ownId].area != self.area)
            return;

        var x = self.x - Player.list[ownId].x + canvas.width/2 - Player.list[ownId].w/2;
        var y = self.y - Player.list[ownId].y + canvas.height/2 - Player.list[ownId].h/2;

        ctx.beginPath();
        ctx.drawImage(wormhole, x - self.w/2, y-self.h/2);
        ctx.fill();

        ctx.font = "bold 18pt Arial";
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.textAlign = 'center';
        ctx.fillText(self.destination, x, y + 50);
        ctx.strokeText(self.destination, x, y + 50);
    };

    Wormhole.list[self.id] = self;

    return self;
};

Wormhole.list = {};