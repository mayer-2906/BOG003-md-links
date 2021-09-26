public class Nodule {
    private String composition;
    private String echogenicity;
    private String form;
    private String margin;
    private boolean echogenicFoci1;
    private boolean echogenicFoci2;
    private boolean echogenicFoci3;
    private boolean echogenicFoci4;
    private float size;
    private int score = 0;
    private String alert;
    private String treatment;

    public Nodule(String composition, String echogenicity, String form, String margin, boolean echogenicFoci1, boolean echogenicFoci2, boolean echogenicFoci3, boolean echogenicFoci4, float size) {
        this.composition = composition;
        this.echogenicity = echogenicity;
        this.form = form;
        this.margin = margin;
        this.echogenicFoci1 = echogenicFoci1;
        this.echogenicFoci1 = echogenicFoci2;
        this.echogenicFoci1 = echogenicFoci3;
        this.echogenicFoci1 = echogenicFoci4;
        this.size = size;
        this.score = this.computeComposition() + this.computeEchogenicity() + this.computeForm() + this.computeMargin() + this.computeEchogenicFoci();
        this.alert = this.computeAlert();
        this.treatment = this.computeTreatment();
    }

    public String getComposition() {
        return this.composition;
    }

    public void setComposition(String composition) {
        this.composition = composition;
    }

    public String getEchogenicity() {
        return this.echogenicity;
    }

    public void setEchogenicity(String echogenicity) {
        this.echogenicity = echogenicity;
    }

    public String getForm() {
        return this.form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public String getMargin() {
        return this.margin;
    }

    public void setMargin(String margin) {
        this.margin = margin;
    }

    public boolean getEchogenicFoci1() {
        return this.echogenicFoci1;
    }

    public void setEchogenicFoci1(boolean echogenicFoci1) {
        this.echogenicFoci1 = echogenicFoci1;
    }

    public boolean getEchogenicFoci2() {
        return this.echogenicFoci2;
    }

    public void setEchogenicFoci2(boolean echogenicFoci2) {
        this.echogenicFoci2 = echogenicFoci2;
    }

    public boolean getEchogenicFoci3() {
        return this.echogenicFoci3;
    }

    public void setEchogenicFoci3(boolean echogenicFoci3) {
        this.echogenicFoci3 = echogenicFoci3;
    }

    public boolean getEchogenicFoci4() {
        return this.echogenicFoci4;
    }

    public void setEchogenicFoci4(boolean echogenicFoci4) {
        this.echogenicFoci4 = echogenicFoci4;
    }

    public float getSize() {
        return this.size;
    }

    public void setSize(float size) {
        this.size = size;
    }

    public String getAlert() {
        return this.alert;
    }

    public String getTreatment() {
        return this.treatment;
    }

    private int computeComposition() {
        int score = 0;
        if (this.composition.equalsIgnoreCase("C3")) {
            score += 1;
        }else if (this.composition.equalsIgnoreCase("C4")) {
            score += 2;
        }
        return score;
    }

    private int computeEchogenicity() {
        int score = 0;
        if (this.echogenicity.equalsIgnoreCase("E2")) {
            score += 1;
        }else if (this.echogenicity.equalsIgnoreCase("E3")) {
            score += 2;
        }else if (this.echogenicity.equalsIgnoreCase("E4")) {
            score += 3;
        }
        return score;
    }

    private int computeForm() {
        return this.form.equalsIgnoreCase("F1") ? 0 : 3;
    }

    private int computeMargin() {
        int score = 0;
        if (this.margin.equalsIgnoreCase("M3")) {
            score += 2;
        }else if (this.margin.equalsIgnoreCase("M4")) {
            score += 3;
        }
        return score;
    }

    private int computeEchogenicFoci() {
        int score = 0;
        if (this.echogenicFoci1) {
            score += 0;
        }
        if (this.echogenicFoci2) {
            score += 1;
        }
        if (this.echogenicFoci3) {
            score += 2;
        }
        if (this.echogenicFoci4) {
            score += 3;
        }
        return score;
    }

    public String computeAlert() {
        String res = "";
        if ((this.score >= 0) && (this.score <= 1)) {
            res = "benigno";
        } else if (this.score == 2) {
            res = "no sospechoso";
        } else if (this.score == 3) {
            res  = "levemente sospechoso";
        } else if ((this.score >= 4) && (this.score <= 6)) {
            res = "moderadamente sospechoso";
        } else if (this.score >= 7) {
            res = "altamente sospechoso";
        }
        return res;
    }

    public String computeTreatment() {
        String res = "";
        if ((this.score >= 0) && (this.score <= 1)) {
            res = "no aaf";
        } else if (this.score == 2) {
            res = "no aaf";
        } else if (this.score == 3) {
            if (this.size >= 2.5) {
                res = "aaf";
            } else {
                res = "seguimiento";
            }
        } else if ((this.score >= 4) && (this.score <= 6)) {
            if (this.size >= 1.5) {
                res = "aaf";
            } else {
                res = "seguimiento";
            }
        } else if (this.score >= 7) {
            if (this.size >= 1) {
                res = "aaf";
            } else {
                res = "seguimiento";
            }
        }
        return res;
    }

}