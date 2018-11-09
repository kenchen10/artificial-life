class TEXTBOX {
   TEXTBOX() {
      // CREATE OBJECT DEFAULT TEXTBOX
   }

   constructor( x, y, w, h) {
      this.X = x; this.Y = y; this.W = w; this.H = h;
      this.TEXTSIZE = height/50;

       // COLORS
       this.Background = color(87);
       this.Foreground = color(255);
       this.BackgroundSelected = color(115);
       this.Border = color(30, 30, 30);

       this.BorderEnable = false;
       this.BorderWeight = 1;
       this.i = "";
       this.initial = this.i;
       this.Text = "";
       this.TextLength = 0;
       this.maxLen = 100;

       this.selected = false;
   }

   DRAW() {
      // DRAWING THE BACKGROUND
      if (this.selected) {
         fill(this.BackgroundSelected);
      } else {
         fill(this.Background);
      }

      if (this.BorderEnable) {
         noStroke();
      } else {
         noStroke();
      }

      rect(this.X, this.Y, this.W, this.H, 2);

      // DRAWING THE TEXT ITSELF
      fill(this.Foreground);
      textSize(this.TEXTSIZE);
      textAlign(LEFT);
      text(this.initial, this.X + (textWidth("a") / 2),this.Y + this.TEXTSIZE/.9);
      fill(this.Foreground);
      textSize(this.TEXTSIZE);
      text(this.Text, this.X + (textWidth("a") / 2),this.Y + this.TEXTSIZE/.9);
   }

   // IF THE KEYCODE IS ENTER RETURN 1
   // ELSE RETURN 0
    KEYPRESSED( KEY,  KEYCODE) {
      if (this.selected) {
        this.initial = "";
         if (KEYCODE == BACKSPACE) {
            this.BACKSPACE();
         } else if (KEYCODE == 32) {
            // SPACE
            this.addText(' ');
         } else if (KEYCODE == ENTER) {
            this.Text = "";
            this.TextLength = 0;
         } else if (this.TextLength <= this.maxLen) {
            // CHECK IF THE KEY IS A LETTER OR A NUMBER
            let isKeyCapitalLetter = (KEY >= 'A' && KEY <= 'Z');
            let isKeySmallLetter = (KEY >= 'a' && KEY <= 'z');
            let isKeyNumber = (KEY >= '0' && KEY <= '9');

            if (isKeyCapitalLetter || isKeySmallLetter || isKeyNumber) {
               this.addText(KEY);
            }
         }
      } else {
        this.initial = this.i;
        fill(this.Foreground);
        textSize(this.TEXTSIZE);
        text(this.initial, this.X + (textWidth("a") / 2),this.Y + this.TEXTSIZE/.9);
      }
   }

   addText(text) {
      // IF THE TEXT WIDHT IS IN BOUNDARIES OF THE TEXTBOX
      if (textWidth(this.Text + text) < this.W) {
         this.Text += text;
         this.TextLength++;
      }
   }

   BACKSPACE() {
      if (this.TextLength - 1 >= 0) {
         this.Text = this.Text.substring(0, this.TextLength - 1);
         this.TextLength--;
      }
   }

   // FUNCTION FOR TESTING IS THE POINT
   // OVER THE TEXTBOX
    overBox(x, y) {
      if (x >= this.X && x <= this.X + this.W) {
         if (y >= this.Y && y <= this.Y + this.H) {
            return true;
         }
      }

      return false;
   }

    PRESSED( x,  y) {
      if (this.overBox(x, y)) {
         this.selected = true;
      } else {
         this.selected = false;
      }
   }
}
