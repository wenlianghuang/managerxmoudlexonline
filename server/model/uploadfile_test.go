package model

import "testing"

func TestNew(t *testing.T) {
	c, err := New("Matt", 100)
	if err != nil {
		t.Fatal("got errors:", err)
	}

	if c == nil {
		t.Error("car should be nil")
	}
}
